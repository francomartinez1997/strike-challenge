import * as bcrypt from 'bcrypt';
import { AppDataSource } from './data-source';
import { User } from './users/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { RoleEnum } from './common/enums/role.enum';

async function seed() {
  await AppDataSource.initialize();

  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);

  const roles: RoleEnum[] = [RoleEnum.ADMIN, RoleEnum.DEVELOPER, RoleEnum.ANALYST];
  for (const name of roles) {
    const existing = await roleRepo.findOneBy({ name });
    if (!existing) {
      await roleRepo.save(roleRepo.create({ name }));
    }
  }

  const user1 = userRepo.create({
    email: 'franco.martinez@strike.com',
    name: 'Franco Martinez Admin',
    role: await roleRepo.findOneBy({ name: RoleEnum.ADMIN }),
    password: await bcrypt.hash('password123', 10),
  });
  const user2 = userRepo.create({
    email: 'juan.perez@strike.com',
    name: 'Juan Perez Dev',
    role: await roleRepo.findOneBy({ name: RoleEnum.DEVELOPER }),
    password: await bcrypt.hash('password456', 10),
  });

  for (const user of [user1, user2]) {
    const existing = await userRepo.findOneBy({ email: user.email });
    if (!existing) {
      await userRepo.save(user);
    }
  }

  console.log('Seed completado.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
