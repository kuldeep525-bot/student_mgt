import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; //node.js bydefault:useful for unlink the file in our use

//configuration to help file upload on the cloudinary

export const initCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
    });

    // upload success → delete local file
    fs.unlinkSync(localFilePath);

    return response; // controller handle karega
  } catch (error) {
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
};
