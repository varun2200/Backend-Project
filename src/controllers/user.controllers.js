import { asyncHandler } from "../utils/asynchandler.js";

import {Apierror} from "../utils/Apierror.js";

import { User } from "../models/user.models.js";

import { UploadOnCloudinary } from "../utils/cloudinary.js";

import { ApiResponse } from "../utils/Apiresponse.js";

const registerUser = asyncHandler(async(req,res)=>{
    //get user details from frontend
    //Validation-not empty
    //check if user does not exist
    //check for images, check foro avatar
    //upload them on cloudinary
    //create user object-create entry in db
    //remove password and refresh token field from response
    //check for user creation 
    //return response
    //this is the algorithm

    const {fullname,email,username,password}=req.body
    console.log("email :",email);

    // if(fullname===""){
    //     throw new Apierror(400,"fullname is required");
    // }
    if([fullname,password,email,username].some((field)=>field?.trim()==="")){
        throw new Apierror(400,"All fields are required")
    }

    const existedUser=User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new Apierror(409, "User already exists,Please login")
    }

    const AvatarPath=req.files?.avatar[0]?.path;
    const coverImagePath=req.files?.coverimage[0]?.path;
    if(!AvatarPath)  throw new Apierror(400,"Avatar is required");
    // if(!coverImagePath)   throw new Apierror(400, "Cover image is required");
    const avatar=await UploadOnCloudinary(AvatarPath);
    const coverImage=await UploadOnCloudinary(coverImagePath);
    if(!avatar)  throw new Apierror(400, "avatar not uploaded");
    const user=await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
        email,
        password,
        useraname:username.toLowerCase()
    })
    const createdUser=await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser)  throw new Apierror(500,"Something went wrong while registering the user");
    
    return res.status(201).json(
        new ApiResponse(200,createdUser," User registered successfully")
    )
})

export  {registerUser};