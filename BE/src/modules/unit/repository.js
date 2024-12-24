const { prismaConnect } = require("../../libs/prisma.helper");

class UnitRepository {
  async CreateUnit(data) {
    return await prismaConnect(async (prisma) => {
      return await prisma.unit.create({
        data: data,
      });
    });
  }

  async EditUnitById(id, data) {
    return await prismaConnect(async (prisma) => {
      return await prisma.unit.update({
        where: {
          id: id,
        },
        data: data,
      });
    });
  }

  async GetUnitById(id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.unit.findUnique({
        where: {
          id,
        },
      });
    });
  }

  async GetUndeletedUnits() {
    return await prismaConnect(async (prisma) => {
      return await prisma.unit.findMany({
        where: {
          deleted: false,
        },
      });
    });
  }
}

module.exports = UnitRepository;
