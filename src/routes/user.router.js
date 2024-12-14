import { Router } from "express"
import { registerUser } from "../controllers/user.controller.js";
import { user_params_validate } from "../middlewares/params.js";

const router = Router();

router.route("/register").post(user_params_validate, registerUser);

export default router;