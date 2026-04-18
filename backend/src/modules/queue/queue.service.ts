import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QueueEntity, QueueStatus as EntityQueueStatus } from './queue.entity';
import { UserEntity } from '../users/user.entity';
import { CreateQueueDto, UpdateQueueDto } from './queue.dto';

const DEFAULT_SERVICE_TIME_MINUTES = 30;

@Injectable()
export class QueueService {
  constructor(
    @InjectRepository(QueueEntity)
    private readonly queueRepo: Repository<QueueEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  private todayDateString(): string {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = String(now.getUTCMonth() + 1).padStart(2, '0');
    const d = String(now.getUTCDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  private activeStatuses(): EntityQueueStatus[] {
    return [EntityQueueStatus.WAITING, EntityQueueStatus.IN_PROGRESS];
  }

  async getQueue(businessId: string) {
    const today = this.todayDateString();
    const items = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.businessId = :businessId', { businessId })
      .andWhere('q.queueDate = :today::date', { today })
      .andWhere('q.status IN (:...statuses)', { statuses: this.activeStatuses() })
      .orderBy('q.priority', 'DESC')
      .addOrderBy('q.position', 'ASC')
      .getMany();

    const currentItem = items.find(i => i.status === EntityQueueStatus.IN_PROGRESS);

    return {
      queue: items,
      total: items.length,
      currentPosition: currentItem?.position ?? 0,
      message: 'Cola obtenida correctamente',
    };
  }

  async addToQueue(businessId: string, createQueueDto: CreateQueueDto) {
    const today = this.todayDateString();

    // Next position = max active position + 1
    const lastItem = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.businessId = :businessId', { businessId })
      .andWhere('q.queueDate = :today::date', { today })
      .andWhere('q.status IN (:...statuses)', { statuses: this.activeStatuses() })
      .orderBy('q.position', 'DESC')
      .getOne();

    const nextPosition = (lastItem?.position ?? 0) + 1;

    // Estimated time: use provided value or derive from business averageServiceTime
    let estimatedTimeMinutes: number;
    if (createQueueDto.estimatedTimeMinutes !== undefined && createQueueDto.estimatedTimeMinutes !== null) {
      estimatedTimeMinutes = createQueueDto.estimatedTimeMinutes;
    } else {
      const business = await this.userRepo.findOne({ where: { id: businessId } });
      const avgTime = business?.settings?.averageServiceTime ?? DEFAULT_SERVICE_TIME_MINUTES;
      // Waiting time = (people ahead) * avgTime. Position 1 = being served (0 wait).
      estimatedTimeMinutes = avgTime * (nextPosition - 1);
    }

    const newItem = this.queueRepo.create({
      clientName: createQueueDto.clientName,
      phoneNumber: createQueueDto.phoneNumber,
      businessId,
      status: EntityQueueStatus.WAITING,
      position: nextPosition,
      estimatedTimeMinutes,
      priority: createQueueDto.priority ?? false,
      queueDate: new Date(today),
    });

    const saved = await this.queueRepo.save(newItem);

    const totalInQueue = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.businessId = :businessId', { businessId })
      .andWhere('q.queueDate = :today::date', { today })
      .andWhere('q.status IN (:...statuses)', { statuses: this.activeStatuses() })
      .getCount();

    return {
      success: true,
      message: 'Cliente agregado a la cola',
      data: saved,
      totalInQueue,
    };
  }

  async updateQueueItem(businessId: string, id: string, updateQueueDto: UpdateQueueDto) {
    const item = await this.queueRepo.findOne({ where: { id, businessId } });
    if (!item) {
      throw new NotFoundException('Turno no encontrado');
    }

    if (updateQueueDto.status !== undefined) {
      item.status = updateQueueDto.status as unknown as EntityQueueStatus;
    }
    if (updateQueueDto.estimatedTimeMinutes !== undefined) {
      item.estimatedTimeMinutes = updateQueueDto.estimatedTimeMinutes;
    }
    if (updateQueueDto.position !== undefined) {
      item.position = updateQueueDto.position;
    }

    const updated = await this.queueRepo.save(item);

    return {
      success: true,
      message: 'Turno actualizado',
      data: updated,
    };
  }

  async removeFromQueue(businessId: string, id: string) {
    const item = await this.queueRepo.findOne({ where: { id, businessId } });
    if (!item) {
      throw new NotFoundException('Turno no encontrado');
    }

    const removedPosition = item.position;
    await this.queueRepo.remove(item);

    // Compact positions of items after the removed one
    const today = this.todayDateString();
    await this.queueRepo
      .createQueryBuilder()
      .update(QueueEntity)
      .set({ position: () => 'position - 1' })
      .where(
        'businessId = :businessId AND queueDate = :today::date AND position > :pos AND status IN (:...statuses)',
        { businessId, today, pos: removedPosition, statuses: this.activeStatuses() },
      )
      .execute();

    await this.recalculateEstimatedTimes(businessId);

    return {
      success: true,
      message: 'Turno eliminado',
    };
  }

  async nextInQueue(businessId: string) {
    const today = this.todayDateString();

    // Mark current IN_PROGRESS as COMPLETED
    const inProgress = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.businessId = :businessId', { businessId })
      .andWhere('q.queueDate = :today::date', { today })
      .andWhere('q.status = :status', { status: EntityQueueStatus.IN_PROGRESS })
      .getOne();

    if (inProgress) {
      inProgress.status = EntityQueueStatus.COMPLETED;
      await this.queueRepo.save(inProgress);
    }

    // Advance first WAITING → IN_PROGRESS
    const next = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.businessId = :businessId', { businessId })
      .andWhere('q.queueDate = :today::date', { today })
      .andWhere('q.status = :status', { status: EntityQueueStatus.WAITING })
      .orderBy('q.priority', 'DESC')
      .addOrderBy('q.position', 'ASC')
      .getOne();

    if (!next) {
      return { success: true, message: 'No hay más turnos en espera', data: null };
    }

    next.status = EntityQueueStatus.IN_PROGRESS;
    next.estimatedTimeMinutes = 0;
    const advanced = await this.queueRepo.save(next);

    await this.recalculateEstimatedTimes(businessId);

    return {
      success: true,
      message: 'Siguiente turno',
      data: advanced,
    };
  }

  async completeQueueItem(businessId: string, id: string) {
    const item = await this.queueRepo.findOne({ where: { id, businessId } });
    if (!item) {
      throw new NotFoundException('Turno no encontrado');
    }

    item.status = EntityQueueStatus.COMPLETED;
    const updated = await this.queueRepo.save(item);

    await this.recalculateEstimatedTimes(businessId);

    return {
      success: true,
      message: 'Turno completado',
      data: updated,
    };
  }

  /** Recalculates estimatedTimeMinutes for all WAITING items based on business averageServiceTime. */
  private async recalculateEstimatedTimes(businessId: string): Promise<void> {
    const today = this.todayDateString();
    const business = await this.userRepo.findOne({ where: { id: businessId } });
    const avgTime = business?.settings?.averageServiceTime ?? DEFAULT_SERVICE_TIME_MINUTES;

    const waitingItems = await this.queueRepo
      .createQueryBuilder('q')
      .where('q.businessId = :businessId', { businessId })
      .andWhere('q.queueDate = :today::date', { today })
      .andWhere('q.status = :status', { status: EntityQueueStatus.WAITING })
      .orderBy('q.priority', 'DESC')
      .addOrderBy('q.position', 'ASC')
      .getMany();

    for (let i = 0; i < waitingItems.length; i++) {
      waitingItems[i].estimatedTimeMinutes = avgTime * (i + 1);
    }

    if (waitingItems.length > 0) {
      await this.queueRepo.save(waitingItems);
    }
  }
}
