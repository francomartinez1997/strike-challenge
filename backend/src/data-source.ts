import { DataSource } from 'typeorm';
import { Role } from './role/entities/role.entity';
import { User } from './users/entities/user.entity';
import { Vulnerability } from './vulnerabilities/entities/vulnerabilities.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [User, Role, Vulnerability],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
  logging: true, 
});
