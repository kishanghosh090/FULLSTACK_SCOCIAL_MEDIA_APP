import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// Configuration of cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// upload on cloudinary ------------------
const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    console.log("File Uploaded On Cloudinary. File Src: " + response.url);
    //once the file is uploaded, we want to delete the file from local Storage
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

// delete from cloudinary-------------------------
const deleteFromCloludinary = async (publicId) => {
  try {
    const result = cloudinary.uploader.destroy(publicId);
    console.log(" deleting from cloudinary PUBLIC id:", publicId);
  } catch (error) {
    console.log("ERROR deleting from cloudinary");
    return null;
  }
};

export { uploadOnCloudinary, deleteFromCloludinary };
