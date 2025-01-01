const { STATUS } = require("@prisma/client");
const { prismaConnect } = require("../../libs/prisma.helper");
const { formatToIndonesianDate, dateDaysAgo } = require("../../libs/date");

class OrderRepository {
  async createOrder(unit_id, user_id, data) {
    const { total_price, ...order_detail } = data;
    return await prismaConnect(async (prisma) => {
      return await prisma.order.create({
        data: {
          total_price: total_price,
          user_id: user_id,
          item: {
            create: {
              unit_id: unit_id,
            },
          },
          order_detail: {
            create: {
              ...order_detail,
            },
          },
        },
      });
    });
  }

  async editOrderById(order_id, data) {
    return await prismaConnect(async (prisma) => {
      return await prisma.order.update({
        where: {
          id: order_id,
        },
        data: data,
      });
    });
  }

  async getDashboardData(day) {
    const orderDate = {};

    if (day) {
      const daysAgo = +day;
      const dateResult = dateDaysAgo(daysAgo);

      orderDate.order_date = {
        gte: dateResult,
      };
    }

    return await prismaConnect(async (prisma) => {
      return await Promise.all([
        prisma.order.count({
          where: {
            ...orderDate,
          },
        }),
        prisma.order.count({
          where: {
            status: STATUS.Riwayat,
            ...orderDate,
          },
        }),
        prisma.order.groupBy({
          by: ["status"],
          where: {
            ...orderDate,
          },
          _sum: {
            total_price: true,
          },
        }),
        prisma.item.count({
          where: {
            order: {
              status: STATUS.Riwayat,
              ...orderDate,
            },
          },
        }),
      ]);
    });
  }

  async getOrderByIdForEdit(order_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.order.findUnique({
        where: {
          id: order_id,
        },
      });
    });
  }

  async getOrderById(order_id) {
    return await prismaConnect(async (prisma) => {
      return await prisma.order.findUnique({
        where: {
          id: order_id,
        },
        include: {
          item: {
            include: {
              unit: true,
            },
          },
          order_detail: true,
          review: true,
          user: true,
        },
      });
    });
  }

  async getOrdersUserByStatus(user_id, status) {
    return await prismaConnect(async (prisma) => {
      return await prisma.order.findMany({
        where: {
          user_id: user_id,
          status: status,
        },
        include: {
          item: {
            include: {
              unit: true,
            },
          },
          order_detail: true,
        },
        orderBy: {
          order_date: "desc",
        },
      });
    });
  }

  async getAllOrder(filter) {
    const { page, status, lte, gte } = filter;

    const limit = 8;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const whereFilter = {};

    if (status && status != "" && STATUS[status]) whereFilter.status = STATUS[status];
    if (lte) whereFilter.order_date = { lte: formatToIndonesianDate(lte), ...whereFilter?.order_date };
    if (gte) whereFilter.order_date = { gte: formatToIndonesianDate(gte), ...whereFilter?.order_date };

    console.log(whereFilter);

    const [items, totalItems] = await prismaConnect(async (prisma) => {
      return await Promise.all([
        prisma.order.findMany({
          where: whereFilter,
          take: limit,
          skip,
          include: {
            item: {
              include: {
                unit: true,
              },
            },
            order_detail: true,
          },
          orderBy: {
            order_date: "desc",
          },
        }),
        prisma.order.count({ where: whereFilter }),
      ]);
    });

    const totalPage = Math.ceil(totalItems / limit);

    return {
      items,
      page,
      total_pages: totalPage,
      total_items: totalItems,
    };
  }
}

module.exports = OrderRepository;
