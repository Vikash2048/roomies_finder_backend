import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asynchandler.js";
import { User } from "../model/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJwt = asyncHandler ( async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

        const decodetoken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("decodetoken:", decodetoken)
        if( !decodetoken ) throw new ApiError(400, "User is not loggedIn")

        const user = await User.findById(decodetoken._id);
        if( !user ) throw new ApiError(400, "user not found")

        req.user = user
        next();
    } catch (error) {
        res.send(error.msg)
    }
})