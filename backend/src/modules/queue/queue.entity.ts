import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { UserEntity } from '../users/user.entity';
import { WhatsAppContactEntity } from '../whatsapp-contacts/whatsapp-contact.entity';

export enum QueueStatus {
  WAITING = 'waiting',
  IN_PROGRESS = 'in-progress',
  COMPLETED = 'completed',
  NO_SHOW = 'noShow',
}

@Entity('queue')
export class QueueEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar' })
  clientName!: string;

  @Column({ type: 'varchar' })
  phoneNumber!: string;

  // Nullable temporalmente para no romper datos historicos; luego migrar a NOT NULL.
  @Index('idx_queue_platform_user_id')
  @Column({ type: 'uuid', nullable: true })
  platformUserId!: string | null;

  @ManyToOne(() => UserEntity, (user) => user.queueItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'platformUserId' })
  platformUser!: UserEntity | null;

  @Index('idx_queue_contact_id')
  @Column({ type: 'uuid', nullable: true })
  contactId!: string | null;

  @ManyToOne(() => WhatsAppContactEntity, (contact) => contact.queueItems, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'contactId' })
  contact!: WhatsAppContactEntity | null;

  @Column({ type: 'enum', enum: QueueStatus, default: QueueStatus.WAITING })
  status!: QueueStatus;

  @Column({ type: 'int', default: 0 })
  position!: number;

  @Column({ type: 'int', nullable: true })
  estimatedTime!: number | null;

  @Column({ type: 'boolean', default: false })
  priority!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column({ type: 'date' })
  queueDate!: Date;
}
