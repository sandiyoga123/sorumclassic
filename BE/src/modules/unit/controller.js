const { response, throwError } = require("../../libs/response");
const { simplifyZodError } = require("../../libs/zod");
const UnitService = require("./service");
const { createUnitSchema, editUnitSchema } = require("./validation");

class UnitController {
  constructor() {
    this.unitService = new UnitService();
  }

  CreateUnit = async (req, res, next) => {
    try {
      let { price, stock, ...data } = req.body;
      data.image = req?.files?.image;
      data = {
        price: +price,
        stock: +stock,
        ...data,
      };

      console.log(data);

      const validate = createUnitSchema.safeParse(data);

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.unitService.CreateUnit(validate.data);

      return response(res, 201, result, "Berhasil menambahkan unit");
    } catch (e) {
      next(e);
    }
  };

  EditUniById = async (req, res, next) => {
    try {
      const { id } = req.params;
      let { price, stock, ...data } = req.body;
      data.image = req?.files?.image;
      data = {
        price: +price,
        stock: +stock,
        ...data,
      };

      const validate = editUnitSchema.safeParse(data);

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.unitService.EditUnitById(id, validate.data);

      return response(res, 200, result, "Berhasil memperbarui unit");
    } catch (e) {
      next(e);
    }
  };

  GetUnitById = async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = await this.unitService.GetUnitById(id, req);

      return response(res, 200, result, "OK");
    } catch (e) {
      next(e);
    }
  };

  GetUnitForUser = async (req, res, next) => {
    try {
      const result = await this.unitService.GetUnitForUser();

      return response(res, 200, result, "OK");
    } catch (e) {
      next(e);
    }
  };
}

module.exports = UnitController;
