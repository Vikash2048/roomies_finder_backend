import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"

cloudinary.config({ 
    // cloud_name: process.env.CLOUD_NAME, 
    // api_key: process.env.API_KEY, 
    // api_secret: process.env.API_SECRET
    cloud_name: "dcgluuga6",
    api_key: "693974596184211",
    api_secret: "ymgiiJXq7aI-st5pO284_nxOlGE"
});

export const uploadOnCloudinary = async ( localFilePaths ) => {
    try {
        if( !localFilePaths){
            console.log("Not able to get file path in cloudinary")
            return null;
        }

        const uploadImages = localFilePaths.map( async(filePath) => {
            const uploadResult = await cloudinary.uploader.upload(filePath, {folder: "Room_image"})

            fs.unlinkSync(filePath)

            return uploadResult.secure_url;
        })

        const uploadedUrls = await Promise.all(uploadImages)
                    
        console.log("uploaded successfully on cloudinary")
        return uploadedUrls;
    } catch (error) {
        localFilePaths.map((filePath) => (
            fs.unlinkSync(filePath)
        ))
        console.log("Error while uploading on cloudinary : ",error.message)
        return null;
    }
}