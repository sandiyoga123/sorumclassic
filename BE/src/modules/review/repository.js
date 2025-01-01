const { prismaConnect } = require("../../libs/prisma.helper");

class ReviewRepository {
  async addReviewByOrderAndUserId(order_id, user_id, data) {
    return await prismaConnect(async (prisma) => {
      return await prisma.review.create({
        data: {
          order_id,
          user_id,
          ...data,
        },
      });
    });
  }
}

module.exports = ReviewRepository;
