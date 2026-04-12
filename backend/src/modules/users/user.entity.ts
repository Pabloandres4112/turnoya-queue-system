import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserRole } from './user-role.enum';
import { WhatsAppContactEntity } from '../whatsapp-contacts/whatsapp-contact.entity';
import { QueueEntity } from '../queue/queue.entity';

export interface UserSettings {
  averageServiceTime: number;
  automationEnabled: boolean;
  excludedContacts: string[];
  maxDaysAhead: number;
}

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.BUSINESS_OWNER,
  })
  role!: UserRole;

  @Column({ type: 'varchar' })
  businessName!: string;

  @Column({ type: 'varchar', unique: true })
  whatsappNumber!: string;

  @Column({ type: 'varchar', nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', nullable: true, select: false })
  passwordHash!: string | null;

  @Column({ type: 'jsonb', nullable: true })
  settings!: UserSettings | null;

  @OneToMany(() => WhatsAppContactEntity, (contact) => contact.platformUser)
  whatsappContacts!: WhatsAppContactEntity[];

  @OneToMany(() => QueueEntity, (queueItem) => queueItem.platformUser)
  queueItems!: QueueEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
