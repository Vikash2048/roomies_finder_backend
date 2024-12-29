import { Router } from "express";
import { addHouseDetails, getAllRooms, getSingleRooms, removeHouseDetails, updateHouseDetails } from "../controllers/landlord.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/addHouseDetails").post(verifyJwt, upload.array("roomImage"), addHouseDetails);

router.route("/removeHouseDetails").post(verifyJwt, removeHouseDetails);

router.route("/getAllHouse").post(verifyJwt, getAllRooms);

router.route("/getSingleHouse").post(verifyJwt, getSingleRooms);

router.route("/updateHouseDetails").post(verifyJwt, upload.array("roomImage"), updateHouseDetails);

export default router