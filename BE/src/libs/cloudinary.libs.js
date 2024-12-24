const { v2: cloudinary } = require("cloudinary");
const path = require("path");
const crypto = require("crypto");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploader = (file) => {
  return new Promise(function (resolve, reject) {
    file.publicId = crypto.randomBytes(16).toString("hex");
    file.name = `${file.publicId}${path.parse(file.name).ext}`;
    cloudinary.uploader
      .upload_stream({ public_id: file.publicId }, function (error, result) {
        if (error) {
          return reject(error);
        }
        resolve(result);
      })
      .end(file.data);
  });
};
