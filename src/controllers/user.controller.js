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
    const avatarLocalPath = await req.file?.path;
    let avatar;

    if (avatarLocalPath) {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        if ( !avatar ) throw new ApiError(500, "Error while uploading image on cloudinary")
    }
    

    // if not create a user
    const user = await User.create({
        fullName,
        email,
        mobile, 
        password,
        userType,
        avatar: avatar?.url
    })

    user.save();

    const userCreated = await User.findById(user._id).select( "-password")
    console.log(userCreated);

    // check if user is created or not
    if( !userCreated ) throw new ApiError(400, "Unable to created user please try again")


    // if created successfully then save the user and return 
    return res
      .status(200)
      .json(new apiResponse(200, userCreated, "User successfull registered"))
})

const generateRefreshAccessToken = async ( userId ) => {
    try {
        const user = await User.findById( userId );
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save( {validateBeforeSave: false} );
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "something went wrong while generating the tokens : ",error.msg);
    }
}

const loginUser = asyncHandler( async (req, res) => {
    // get user detail from body
    const { email, password } = req.body;

    // check if email and password is present or not
    if ( !email || !password ) throw new ApiError(400, "Please provide email and password");

    // verify that user present in db or not if not the return them error saying register first
    const user = await User.findOne({ email });
    if ( !user ) throw new ApiError(404, "User not register, please register yourself first");

    // if present the check user detail like email and password
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if ( !isPasswordCorrect ) throw new ApiError(400, "Password is incorrect, try again")

    // if everything go well then create refresh and access token and then logged in user
    const { accessToken, refreshToken } = await generateRefreshAccessToken( user._id );
    // console.log("tokens: ", accessToken, refreshToken)

    const loggedInUser = await User.findById( user._id ).select("-password -refreshToken");

    // send cookies 
    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(new apiResponse(
            200,
            {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
            "user loggedin successfully"
        ));
})

const logoutUser = asyncHandler( async (req, res) => {
    // get user
    const user = req.user;
    // console.log(user)

    // remove cookies from database and http cookies
    const updatedUser = await User.findOneAndUpdate(
        { _id: user._id},
        {
            $set: { refreshToken: ""}
        },
        { new: true},
    )

    // update the data base
    const options = {
        http: true,
        secure: true,
    }

    console.log('updated user: ', updatedUser)

    // return 
    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json( new apiResponse( 200, {}, "user logout successfully"))
})

const forgetPassword = asyncHandler( async (req, res) => {
    // get the user 
    const user = req.user;
    // get the updated password and the confirm password
    const { currentPassword, newPassword, confirmPassword } = req.body;
    if ( newPassword !== confirmPassword ) throw new ApiError(400, "new password and confirm password did not matched")
    if ( currentPassword === newPassword ) throw new ApiError(400, "new password and current password can not be same")

    // replace the updated password with the old password 
    user.password = newPassword
    user.save({validateBeforeSave: false})
    // return the user
    return res
        .status(200)
        .json(new apiResponse(200,{}, "Password updated successfully"))
})

export { registerUser, loginUser, logoutUser, forgetPassword }

