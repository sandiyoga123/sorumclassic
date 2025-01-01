const z = require("zod");
const { isNumericWord } = require("../../libs/regex");
exports.createOrderSchema = z.object({
  name: z.string().min(3, { message: "Nama minimal terdiri dari 3 karakter" }),
  address: z.string().min(1, { message: "Alamat perlu diisi" }),
  phone: z
    .string()
    .min(10, { message: "Nomor Telepon minimal memiliki 10 digit angka" })
    .max(13, { message: "Nomor Telepon maksimal memiliki 13 digit angka" })
    .refine((e) => isNumericWord(e), {
      message: "Nomor Telepon hanya bisa mengandung angka",
    }),
  postal_code: z.string().min(1, { message: "Kode Pos perlu diisi" }),
  expedition: z.string().min(1, { message: "Ekspedisi perlu diisi" }),
  additional_info: z.string().optional(),
});

exports.reviewOrderSchema = z.object({
  rating: z.number().min(1, { message: "Rating perlu diisi" }),
  review: z.string().min(1, { message: "Review perlu diisi" }),
});
