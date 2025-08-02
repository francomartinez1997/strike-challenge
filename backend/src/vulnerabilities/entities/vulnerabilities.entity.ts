import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { VulnerabilityStatus } from '../../common/enums/vulnerability-status.enum';
import { Criticality } from '../../common/enums/criticality.enum';
import { User } from '../../users/entities/user.entity';

@Entity('vulnerabilities')
export class Vulnerability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'enum', enum: Criticality, default: Criticality.LOW })
  criticality: Criticality;

  @Column({ type: 'varchar', nullable: true })
  cwe?: string;

  @Column({ type: 'text', nullable: false })
  suggestedFix: string;

  @Column({ type: 'enum', enum: VulnerabilityStatus, default: VulnerabilityStatus.PENDING_FIX })
  status: VulnerabilityStatus;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: false, eager: true })
  @JoinColumn({ name: 'reporter_id' })
  reporter: User;

  @ManyToOne(() => User, { nullable: true, eager: true })
  @JoinColumn({ name: 'assignee_id' })
  assignee?: User;
}
