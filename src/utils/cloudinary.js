import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"
import path from "path"

cloudinary.config({ 
    // cloud_name: process.env.CLOUD_NAME, 
    // api_key: process.env.API_KEY, 
    // api_secret: process.env.API_SECRET
    cloud_name: "dcgluuga6",
    api_key: "693974596184211",
    api_secret: "ymgiiJXq7aI-st5pO284_nxOlGE"
});

export const uploadOnCloudinary = async ( localFilePath ) => {
    try {
        if( !localFilePath){
            console.log("Not able to get file path in cloudinary")
            return null;
        }
        const fileName = path.basename(localFilePath, path.extname(localFilePath))
        const uploadResult = await cloudinary.uploader.upload(
            localFilePath,
            {
                resource_type: "image",
                display_name: fileName
            }
        )

        console.log("uploaded successfully on cloudinary")
        return uploadResult;
    } catch (error) {
        fs.unlinkSync(localFilePath);
        console.log("Error while uploading on cloudinary : ",error.message)
        return null;
    }
    finally{
        fs.unlinkSync(localFilePath);
    }
}