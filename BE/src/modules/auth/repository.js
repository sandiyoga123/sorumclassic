const { PrismaClient, ROLE } = require("@prisma/client");
const { prismaConnect } = require("../../libs/prisma.helper");
class AuthRepository {
  async checkDuplicate(username, phone) {
    return await prismaConnect(async (prisma) => {
      return await Promise.all([
        prisma.user.findUnique({
          where: {
            username: username,
          },
        }),
        prisma.user.findUnique({
          where: {
            phone: phone,
          },
        }),
      ]);
    });
  }

  async register(data) {
    return await prismaConnect(async (prisma) => {
      return prisma.user.create({
        data: data,
      });
    });
  }

  async getUserByUsername(username) {
    return await prismaConnect(async (prisma) => {
      return await prisma.user.findFirst({ where: { username } });
    });
  }
}

module.exports = AuthRepository;
