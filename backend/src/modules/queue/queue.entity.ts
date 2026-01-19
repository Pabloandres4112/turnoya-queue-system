import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum QueueStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  NO_SHOW = 'noShow',
}

@Entity('queue')
export class QueueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  clientName: string;

  @Column({ type: 'varchar' })
  phoneNumber: string;

  @Column({ type: 'enum', enum: QueueStatus, default: QueueStatus.WAITING })
  status: QueueStatus;

  @Column({ type: 'int', default: 0 })
  position: number;

  @Column({ type: 'int', nullable: true })
  estimatedTime: number | null;

  @Column({ type: 'boolean', default: false })
  priority: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date' })
  queueDate: Date;
}
