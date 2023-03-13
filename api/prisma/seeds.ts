import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // ORGANIZAÇÕES
  const organizationsData = [
    { name: 'POLÍCIA FEDERAL' },
    { name: 'POLÍCIA CIVIL' },
    { name: 'POLÍCIA MILITAR' },
    { name: 'GUARDA MUNICIPAL' },
  ];
  console.log(`Start seeding organizations...`);
  for (const organization of organizationsData) {
    const organizations = await prisma.organizations.create({
      data: organization,
    });
    console.log(`Created organization with id: ${organizations.id}`);
  }
  console.log(`Seeding finished.`);

  // GRUPOS
  const groupsData = [
    { name: 'ADMINISTRADOR' },
    { name: 'GESTOR' },
    { name: 'COORDENADOR' },
    { name: 'OSTENSIVO' },
    { name: 'MASTER' },
  ];
  console.log(`Start seeding groups...`);
  for (const group of groupsData) {
    const user = await prisma.groups.create({
      data: group,
    });
    console.log(`Created group with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);

  // USUÁRIOS
  const userData = [
    {
      name: 'Arthur Balboa',
      email: 'arthur@email.com',
      organizationId: 1,
      registration: '000000',
      password: await bcrypt.hash('string', 10),
      status: true,
    },
  ];
  console.log(`Start seeding users...`);
  for (const userSeed of userData) {
    const user = await prisma.users.create({
      data: userSeed,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);

  // Permissão USUÁRIO 1
  const groupsOnUsers = [
    {
      userId: 1,
      groupId: 5,
    },
  ];
  console.log(`Start seeding master permission on usr 01...`);
  for (const groupsOnUsersSeed of groupsOnUsers) {
    await prisma.groupsOnUsers.create({
      data: groupsOnUsersSeed,
    });
    console.log(`Created permission MASTER to usr 01`);
  }
  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
