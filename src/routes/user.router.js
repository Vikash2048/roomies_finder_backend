import { Router } from "express"
import { loginUser, logoutUser, registerUser, forgetPassword } from "../controllers/user.controller.js";
import { user_params_validate } from "../middlewares/params.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post( user_params_validate, upload.single("avatar"),  registerUser );

router.route("/login").post( loginUser );

router.route("/logout").post( verifyJwt, logoutUser );

router.route("/forgetPassword").post( verifyJwt, forgetPassword)

export default router;