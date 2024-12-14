import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = asyncHandler( async ( req, res) => {

    // req body
    const { fullName, email, mobile, password, userType } = req.body;
    // console.log("user details: ",fullName, email, mobile, password, userType)

    // check that the user is already present or not
    const existedUser = await User.findOne({email});
    if( existedUser ) throw new ApiError(400,"User with email id already exist.");

    // uploading avatar file on cloudinary
    const avatarLocalPath = await req.file.path;

    const avatar = await uploadOnCloudinary(avatarLocalPath)
    if ( !avatar ) throw new ApiError(500, "Error while uploading image on cloudinary")

    // if not create a user
    const user = await User.create({
        fullName,
        email,
        mobile, 
        password,
        userType,
        avatar: avatar.url
    })

    const userCreated = await User.findById(user._id).select( "-password")
    console.log(userCreated);

    // check if user is created or not
    if( !userCreated ) throw new ApiError(400, "Unable to created user please try again")


    // if created successfully then save the user and return 
    return res
      .status(200)
      .json(new apiResponse(200, userCreated, "User successfull registered"))
})

export { registerUser }