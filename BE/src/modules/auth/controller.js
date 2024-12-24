const { PrismaClient, ROLE } = require("@prisma/client");
const prisma = new PrismaClient();
const { generateRandomString } = require("../../libs/randomString");
const { registerSchema, changePasswordSchema } = require("./validation");
const { simplifyZodError } = require("../../libs/zod");
const { throwError, response } = require("../../libs/response");
const AuthService = require("./service");

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }
  login = async (req, res, next) => {
    try {
      let { username, password } = req.body;

      if (!username || !password) {
        throwError(400, "Terdapat beberapa field kosong");
      }

      const result = await this.authService.login({ username, password });

      return response(res, 200, result, "Login berhasil");
    } catch (error) {
      next(error);
    }
  };

  register = async (req, res, next) => {
    try {
      const { name, username, phone, password } = req.body;

      const validate = registerSchema.safeParse({ name, username, phone, password });

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      const result = await this.authService.register(validate.data);

      return response(res, 201, result, "Register berhasil");
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      return response(res, 200, req.user_data, "Berhasil mendapatkan data profile");
    } catch (e) {
      next(e);
    }
  };

  changePassword = async (req, res, next) => {
    try {
      const { new_password, confirm_password } = req.body;

      const validate = changePasswordSchema.safeParse({ new_password, confirm_password });

      if (!validate.success) {
        const zodResponse = simplifyZodError(validate.error);
        throwError(400, zodResponse);
      }

      validate.data.user = req.user_data;

      const result = await this.authService.changePassword(validate.data);

      return response(res, 200, result, "Berhasil mengganti password");
    } catch (e) {
      next(e);
    }
  };
}

module.exports = AuthController;
