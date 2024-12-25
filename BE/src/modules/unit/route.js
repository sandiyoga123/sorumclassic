const express = require("express");
const { middleware, authorize } = require("../../middleware/middleware");
const { ROLE } = require("@prisma/client");
const UnitController = require("./controller");
const router = express.Router();

const unitController = new UnitController();

router.post("/", middleware, authorize(ROLE.admin), unitController.CreateUnit);
router.put("/:id", middleware, authorize(ROLE.admin), unitController.EditUniById);
router.delete("/:id", middleware, authorize(ROLE.admin), unitController.SoftDeleteUnitById);
router.get("/", unitController.GetUnitForUser);
router.get("/:id", unitController.GetUnitById);

module.exports = router;
