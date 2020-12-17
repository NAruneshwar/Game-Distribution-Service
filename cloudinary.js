//setting up our cloudinary account linking with multer upload files
const cloudinary = require('cloudinary');

const dotenv = require('dotenv');
dotenv.config();
cloudinary.config({
  cloud_name: "naruneshwar",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: "K98dXvHF0nIH2JUqUuN_X7fUGgA",
});

exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: 'auto',
        folder: folder,
      }
    );
  });
};