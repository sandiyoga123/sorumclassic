const { throwError } = require("../../libs/response");
const AuthRepository = require("./repository");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;
const jwt = require("jsonwebtoken");

class AuthService {
  constructor() {
    this.authRepo = new AuthRepository();
  }
  async register(data) {
    try {
      const [duplicateUsername, duplicatePhone] = await this.authRepo.checkDuplicate(data.username, data.phone);

      if (duplicateUsername) {
        throwError(409, "Username sudah digunakan");
      }
      if (duplicatePhone) {
        throwError(409, "Nomor telepon sudah digunakan");
      }

      let encryptedPassword = await bcrypt.hash(data.password, 10);
      data.password = encryptedPassword;

      const user = await this.authRepo.register(data);

      delete user.password;

      return user;
    } catch (e) {
      throw e;
    }
  }

  async login(data) {
    try {
      const { username, password } = data;

      const user = await this.authRepo.getUserByUsername(username);

      if (!user) {
        throwError(400, "Nomor Identitas atau Password salah");
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);

      if (!isPasswordCorrect) {
        throwError(400, "Nomor Identitas atau Password salah");
      }
      delete user.password;

      const token = jwt.sign(user, JWT_SECRET);
      return { ...user, token };
    } catch (e) {
      throw e;
    }
  }

  async changePassword(data) {
    const { new_password, confirm_password, user } = data;

    if (new_password !== confirm_password) {
      throwError(400, "Kedua password baru yang diberikan tidak sesuai");
    }

    const hashedPassword = bcrypt.hashSync(new_password, 10);

    return await this.authRepo.changePassword(user.id, hashedPassword);
  }
}

module.exports = AuthService;
