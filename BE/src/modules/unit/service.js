const { ROLE } = require("@prisma/client");
const { uploader } = require("../../libs/cloudinary.libs");
const { throwError } = require("../../libs/response");
const { loggedUser } = require("../../middleware/middleware");
const UnitRepository = require("./repository");

class UnitService {
  constructor() {
    this.unitRepo = new UnitRepository();
  }
  async CreateUnit(data) {
    try {
      const imageUrl = await uploader(data.image);

      data.image = imageUrl.secure_url;

      return await this.unitRepo.CreateUnit(data);
    } catch (e) {
      console.log(e);
      throwError(400, "Gagal membuat unit");
    }
  }

  async EditUnitById(id, data) {
    const unit = await this.unitRepo.GetUnitById(id);

    if (!unit) {
      throwError(404, "Data tidak ditemukan");
    }

    if (data.image) {
      const imageUrl = await uploader(data.image);

      data.image = imageUrl.secure_url;
    } else {
      delete data?.image;
    }

    return await this.unitRepo.EditUnitById(id, data);
  }

  async GetUnitById(id, req) {
    const data = await this.unitRepo.GetUnitById(id);

    if (!data) {
      throwError(404, "Data tidak ditemukan");
    }

    const user = await loggedUser(req);

    if (data.deleted && (!user || user.role != ROLE.admin)) throwError(404, "Data tidak ditemukan");

    return data;
  }

  async GetUnitForUser() {
    return await this.unitRepo.GetUndeletedUnits();
  }
}

module.exports = UnitService;
