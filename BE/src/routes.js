const express = require("express");
const router = express.Router();
const authRoute = require("./modules/auth/route");
const unitRoute = require("./modules/unit/route");
const orderRoute = require("./modules/order/route");

/* GET home page. */
router.use("/auth", authRoute);
router.use("/unit", unitRoute);
router.use("/order", orderRoute);

module.exports = router;
