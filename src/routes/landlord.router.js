import { Router } from "express";
import { addDetails, getAllRooms, removeDetails } from "../controllers/landlord.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/addDetails").post(verifyJwt, upload.array("roomImage"), addDetails);

router.route("/removeDetails").post(verifyJwt, removeDetails);

router.route("/getAllHouse").post(verifyJwt, getAllRooms);

export default router