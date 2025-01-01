const { expedition } = require("../../libs/expedition");
const { throwError } = require("../../libs/response");
const { uploader } = require("../../libs/cloudinary.libs");
const UnitRepository = require("../unit/repository");
const OrderRepository = require("./repository");
const { STATUS, ROLE } = require("@prisma/client");
const ReviewRepository = require("../review/repository");
const { statusLevel } = require("../../libs/packet-level");

class OrderService {
  constructor() {
    this.unitRepo = new UnitRepository();
    this.orderRepo = new OrderRepository();
    this.reviewRepo = new ReviewRepository();
  }
  async createOrder(unit_id, user_id, data) {
    const unit = await this.unitRepo.GetUnitById(unit_id);
    if (!unit) throwError(404, "Data tidak ditemukan");

    if (unit.stock < 1) throwError(400, "Unit sudah habis");

    data.expedition_fee = expedition[data.expedition];
    data.total_price = unit.price + data.expedition_fee;

    unit.stock = unit.stock - 1;
    await this.unitRepo.EditUnitById(unit_id, unit);

    return await this.orderRepo.createOrder(unit_id, user_id, data);
  }

  async uploadPaymentProof(order_id, file) {
    const order = await this.orderRepo.getOrderByIdForEdit(order_id);

    if (!order) throwError(404, "Pesanan tidak ditemukan");

    if (file instanceof Object) {
      const image = await uploader(file);
      order.payment_proof = image.secure_url;
    } else {
      throwError(400, "File harus berupa gambar");
    }

    order.status = STATUS.Dikemas;

    return await this.orderRepo.editOrderById(order_id, order);
  }

  async addReview(order_id, user_id, data) {
    const order = await this.orderRepo.getOrderByIdForEdit(order_id);

    if (!order) throwError(404, "Pesanan tidak ditemukan");

    order.status = STATUS.Riwayat;

    await this.orderRepo.editOrderById(order_id, order);

    return await this.reviewRepo.addReviewByOrderAndUserId(order_id, user_id, data);
  }

  async updateOrderStatus(order_id, data) {
    const { status, image } = data;

    if (!STATUS[status] || status == STATUS.Dikemas || status == STATUS.Riwayat) throwError(400, `Pesanan tidak dapat diubah menjadi ${status}`);

    if (status == STATUS.Dikirim && !image) throwError(400, "Anda perlu menyertakan resi berupa gambar");

    const orderData = await this.orderRepo.getOrderByIdForEdit(order_id);

    if (statusLevel(status) - statusLevel(orderData.status) != 1 && status !== STATUS.Ditolak) throwError(400, "Perubahan status perlu dilakukan bertahap");

    if (status == STATUS.Dikirim) {
      if (image && image instanceof Object) {
        const imageRes = await uploader(image);
        orderData.receipt = imageRes.secure_url;
      } else {
        throwError(400, "File harus berupa gambar");
      }
    }

    orderData.status = STATUS[status];

    return await this.orderRepo.editOrderById(order_id, orderData);
  }

  async getDashboardData(day) {
    const [totalOrder, completedOrder, totalCompletedPayment, soldUnit] = await this.orderRepo.getDashboardData(day);

    return {
      totalOrder: totalOrder || 0,
      completedOrder: completedOrder || 0,
      totalCompletedPayment: totalCompletedPayment[0]?._sum?.total_price || 0,
      soldUnit: soldUnit || 0,
    };
  }

  async getAllOrder(filter) {
    return await this.orderRepo.getAllOrder(filter);
  }

  async getOrderDetailById(order_id) {
    const order = await this.orderRepo.getOrderById(order_id);

    if (!order) throwError(404, "Pesanan tidak ditemukan");

    return order;
  }

  async getOrdersUserByStatus(user_id, status) {
    return await this.orderRepo.getOrdersUserByStatus(user_id, status);
  }
}

module.exports = OrderService;
