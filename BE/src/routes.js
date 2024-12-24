const express = require("express");
const router = express.Router();
const authRoute = require("./modules/auth/route");
const unitRoute = require("./modules/unit/route");

/* GET home page. */
router.use("/auth", authRoute);
router.use("/unit", unitRoute);

module.exports = router;
