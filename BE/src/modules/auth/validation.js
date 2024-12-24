const z = require("zod");
const { isNumericWord } = require("../../libs/regex");
exports.registerSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal terdiri dari 3 karakter" }),
  username: z.string().min(5, { message: "Username minimal mengandung 5 angka" }),
  phone: z
    .string()
    .min(10, { message: "Nomor Telepon minimal memiliki 10 digit angka" })
    .max(13, { message: "Nomor Telepon maksimal memiliki 13 digit angka" })
    .refine((e) => isNumericWord(e), {
      message: "Nomor Telepon hanya bisa mengandung angka",
    }),
  password: z.string().min(8, { message: "Password minimal terdiri dari 8 karakter" }),
});

exports.changePasswordSchema = z.object({
  new_password: z.string().min(8, { message: "Password Baru minimal terdiri dari 8 karakter" }),
  confirm_password: z.string().min(8, { message: "Konfirmasi Password minimal terdiri dari 8 karakter" }),
});
