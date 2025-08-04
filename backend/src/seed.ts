import * as bcrypt from 'bcrypt';
import { AppDataSource } from './data-source';
import { User } from './users/entities/user.entity';
import { Role } from './role/entities/role.entity';
import { RoleEnum } from './common/enums/role.enum';
import { Vulnerability } from './vulnerabilities/entities/vulnerabilities.entity';
import { Criticality } from './common/enums/criticality.enum';
import { VulnerabilityStatus } from './common/enums/vulnerability-status.enum';

async function seed() {
  await AppDataSource.initialize();

  const roleRepo = AppDataSource.getRepository(Role);
  const userRepo = AppDataSource.getRepository(User);
  const vulnRepo = AppDataSource.getRepository(Vulnerability);

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

  const reporter = await userRepo.findOneByOrFail({ email: 'franco.martinez@strike.com' });
  const assignee = await userRepo.findOneByOrFail({ email: 'juan.perez@strike.com' });

  const vulnerabilities: Partial<Vulnerability>[] = [
    {
      title: 'SQL Injection in login endpoint',
      description: 'The login endpoint does not sanitize input, allowing SQL injection attacks.',
      criticality: Criticality.HIGH,
      cwe: 'CWE-89',
      suggestedFix: 'Use parameterized queries to prevent injection.',
      status: VulnerabilityStatus.PENDING_FIX,
      reporter,
      assignee,
    },
    {
      title: 'XSS in comment section',
      description: 'User input is not escaped, allowing execution of scripts.',
      criticality: Criticality.MEDIUM,
      cwe: 'CWE-79',
      suggestedFix: 'Escape user input before rendering.',
      status: VulnerabilityStatus.IN_PROGRESS,
      reporter,
      assignee,
    },
    {
      title: 'Remote Code Execution via File Upload',
      description: 'The application allows arbitrary file uploads without validation, enabling remote code execution.',
      criticality: Criticality.LOW,
      cwe: 'CWE-434',
      suggestedFix: 'Restrict allowed file types and validate file content before processing.',
      status: VulnerabilityStatus.PENDING_FIX,
      reporter,
      assignee,
    },
  ];

  for (const vulnData of vulnerabilities) {
    const existing = await vulnRepo.findOneBy({ title: vulnData.title });
    if (!existing) {
      const vuln = vulnRepo.create(vulnData);
      await vulnRepo.save(vuln);
    }
  }

  console.log('Seed completado.');
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
