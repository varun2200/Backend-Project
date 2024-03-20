import { v2 as cloudinary } from "cloudinary";

import fs from "fs";


          
cloudinary.config({ 
  cloud_name:process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const UploadOnCloudinary=async(filePath)=>{
    try {
        if(!filePath)  return null;
        const response =await cloudinary.uploader.upload(filePath,{
            resource_type:"auto"
        });
        console.log("File is uploaded on the cloudinary", response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(filePath);
        return null;
    }
}

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });

export {UploadOnCloudinary};