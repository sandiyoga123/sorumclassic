const z = require("zod");
const { isNumericWord } = require("../../libs/regex");

exports.createUnitSchema = z.object({
  name: z.string().min(1, { message: "Nama unit wajib diisi" }),
  brand: z.string().min(1, { message: "Brand unit wajib diisi" }),
  look: z.string().min(1, { message: "Look unit wajib diisi" }),
  year: z.string().min(1, { message: "Tahun unit wajib diisi" }),
  document: z.string().min(1, { message: "Kelengkapan surat unit wajib diisi" }),
  type: z.string().min(1, { message: "Tipe unit wajib diisi" }),
  image: z.any().refine((e) => e instanceof Object, { message: "Gambar unit harus disertakan" }),
  description: z.string().min(1, { message: "Deskripsi perlu diisi" }),
  price: z.number().min(0, { message: "Harga tidak boleh minus" }),
  stock: z.number().min(0, { message: "Stok tidak boleh minus" }),
});
exports.editUnitSchema = z.object({
  name: z.string().min(1, { message: "Nama unit wajib diisi" }),
  brand: z.string().min(1, { message: "Brand unit wajib diisi" }),
  look: z.string().min(1, { message: "Look unit wajib diisi" }),
  year: z.string().min(1, { message: "Tahun unit wajib diisi" }),
  document: z.string().min(1, { message: "Kelengkapan surat unit wajib diisi" }),
  type: z.string().min(1, { message: "Tipe unit wajib diisi" }),
  image: z
    .any()
    .refine((e) => e instanceof Object, { message: "Gambar unit harus disertakan" })
    .optional(),
  description: z.string().min(1, { message: "Deskripsi perlu diisi" }),
  price: z.number().min(0, { message: "Harga tidak boleh minus" }),
  stock: z.number().min(0, { message: "Stok tidak boleh minus" }),
});
