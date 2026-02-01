import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({ type: 'varchar' })
  businessName!: string;

  @Column({ type: 'varchar', unique: true })
  whatsappNumber!: string;

  @Column({ type: 'varchar', nullable: true })
  email!: string | null;

  @Column({ type: 'varchar', select: false })
  passwordHash!: string;

  @Column({ type: 'jsonb', nullable: true })
  settings!: UserSettings | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
