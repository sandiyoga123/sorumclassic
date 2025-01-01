const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const { ROLE } = require("@prisma/client");
const OrderController = require("./controller");
const router = express.Router();

const orderController = new OrderController();

/* GET users listing. */
router.post("/:unit_id", middleware, authorize(ROLE.user), orderController.createOrder);
router.put("/pay/:order_id", middleware, authorize(ROLE.user), orderController.uploadPaymentProof);
router.put("/review/:order_id", middleware, authorize(ROLE.user), orderController.addReview);
router.put("/:order_id", middleware, authorize(ROLE.admin), orderController.updateOrderStatus);

router.get("/", middleware, authorize(ROLE.admin), orderController.getAllOrder);
router.get("/dashboard", middleware, authorize(ROLE.admin), orderController.getDashboardData);
router.get("/status/:status", middleware, authorize(ROLE.user), orderController.getOrdersUserByStatus);
router.get("/:order_id", middleware, authorize(ROLE.admin), orderController.getOrderDetailById);

module.exports = router;
