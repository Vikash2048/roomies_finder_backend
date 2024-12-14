import { Router } from "express"
import { registerUser } from "../controllers/user.controller.js";
import { user_params_validate } from "../middlewares/params.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/register").post(user_params_validate, upload.single("avatar"),  registerUser);

export default router;