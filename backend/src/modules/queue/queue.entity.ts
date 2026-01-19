import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('queue')
export class QueueEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  clientName: string;

  @Column()
  phoneNumber: string;

  @Column({ default: 'waiting' })
  status: 'waiting' | 'in-progress' | 'completed' | 'no-show';

  @Column({ default: 0 })
  position: number;

  @Column({ nullable: true })
  estimatedTime: number;

  @Column({ default: false })
  priority: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date' })
  queueDate: Date;
}
