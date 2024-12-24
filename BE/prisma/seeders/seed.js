const { PrismaClient } = require("@prisma/client");
const { UsersSeeder } = require("./users.seeders");

const prisma = new PrismaClient();

async function main() {
  await reset();

  const createUser = await UsersSeeder(prisma);
}

async function reset() {
  await prisma.user.deleteMany();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
