import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false, length: 100, comment: 'Nombre del usuario' })
  public name: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 100, comment: 'Email del usuario' })
  public email: string;

  @Exclude()
  @Column({ type: 'varchar', select: false, nullable: false, length: 100, comment: 'Contraseña del usuario' })
  public password: string;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  public role: Role;

  @CreateDateColumn({ name: 'created_at', comment: 'Campo que indica cuando fue creado el registro' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', comment: 'Campo que indica cuando fue actualizado el registro' })
  public updatedAt: Date;

  @DeleteDateColumn({ nullable: true, name: 'deleted_at', comment: 'Campo que indica cuando fue eliminado el registro' })
  public deletedAt?: Date | null;
}
