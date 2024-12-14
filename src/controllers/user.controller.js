import { asyncHandler } from "../utils/asynchandler.js";

const registerUser = asyncHandler( async ( req, res ) => {
    const { fullName, email, mobile, password, userType } = req.body;
    console.log("user details: ",fullName, email, mobile, password, userType)

    res.send("ok")
})

export { registerUser }