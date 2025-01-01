const { response } = require("../../libs/response");
const OrderService = require("./service");
const { createOrderSchema, reviewOrderSchema } = require("./validation");

class OrderController {
  constructor() {
    this.orderService = new OrderService();
  }
  createOrder = async (req, res, next) => {
    try {
      const { unit_id } = req.params;

      const validate = createOrderSchema.safeParse(req.body);

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.orderService.createOrder(unit_id, req.user_data.id, validate.data);

      return response(res, 201, result, "Berhasil membuat pesanan");
    } catch (e) {
      next(e);
    }
  };

  uploadPaymentProof = async (req, res, next) => {
    try {
      const { order_id } = req.params;

      const result = await this.orderService.uploadPaymentProof(order_id, req.files.image);

      return response(res, 200, result, "Berhasil mengupload bukti pembayaran");
    } catch (e) {
      next(e);
    }
  };

  updateOrderStatus = async (req, res, next) => {
    try {
      const { order_id } = req.params;
      const { status } = req.body;
      const image = req?.files?.image;

      const result = await this.orderService.updateOrderStatus(order_id, { status, image });

      return response(res, 200, result, "Berhasil memperbarui status pesanan");
    } catch (e) {
      next(e);
    }
  };

  addReview = async (req, res, next) => {
    try {
      const { order_id } = req.params;

      const validate = reviewOrderSchema.safeParse(req.body);

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.orderService.addReview(order_id, req.user_data.id, validate.data);

      return response(res, 200, result, "Berhasil memberikan review");
    } catch (e) {
      next(e);
    }
  };

  getDashboardData = async (req, res, next) => {
    try {
      const { day } = req.query;

      const result = await this.orderService.getDashboardData(day);

      console.dir(result, { depth: null });

      return response(res, 200, result, null);
    } catch (e) {
      next(e);
    }
  };

  getAllOrder = async (req, res, next) => {
    try {
      const { page = 1, status = "", lte, gte } = req.query;

      const result = await this.orderService.getAllOrder({ page: +page, status, lte, gte });

      return response(res, 200, result, null);
    } catch (e) {
      next(e);
    }
  };

  getOrderDetailById = async (req, res, next) => {
    try {
      const { order_id } = req.params;

      const result = await this.orderService.getOrderDetailById(order_id);

      return response(res, 200, result, null);
    } catch (e) {
      next(e);
    }
  };

  getOrdersUserByStatus = async (req, res, next) => {
    try {
      const { status } = req.params;

      const result = await this.orderService.getOrdersUserByStatus(req.user_data.id, status);

      return response(res, 200, result, null);
    } catch (e) {
      next(e);
    }
  };
}

module.exports = OrderController;
