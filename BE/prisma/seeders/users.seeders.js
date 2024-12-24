const { PrismaClient, ROLE } = require("@prisma/client");
const bcrypt = require("bcrypt");

/**
 *
 * @param {PrismaClient} prisma
 * @returns
 */
exports.UsersSeeder = async (prisma) => {
  return new Promise(async (resolve, reject) => {
    const datas = [
      {
        name: "admin",
        username: "admin",
        phone: "081314206253",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.admin,
      },
      {
        name: "user",
        username: "user",
        phone: "081314206254",
        password: bcrypt.hashSync("tes123", 10),
        role: ROLE.user,
      },
    ];

    try {
      const results = [];

      for await (const data of datas) {
        const result = await prisma.user.create({
          data: data,
        });

        results.push(result);
      }

      console.log("Created user seeders");

      resolve(results);
    } catch (error) {
      reject(error.message);
    }
  });
};
