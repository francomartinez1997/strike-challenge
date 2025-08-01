import { DataSource } from 'typeorm';
import { Role } from './role/entities/role.entity';
import { User } from './users/entities/user.entity';
import { Vulnerability } from './vulnerabilities/entities/vulnerabilities.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'db', // 'db' for Docker, 'localhost' for local development 
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'strikechallenge',
  entities: [User, Role, Vulnerability],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true, 
});
