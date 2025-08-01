import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { RoleEnum } from '../../common/enums/role.enum';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: RoleEnum, unique: true })
  name: RoleEnum;
}
