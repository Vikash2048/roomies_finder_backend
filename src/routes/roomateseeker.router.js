import { Router } from 'express';
import { upload } from '../middlewares/multer.middleware.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';
import { addDetails, removeDetails, updateRoomDetails } from '../controllers/roomateseeker.controller.js';

const router = Router();

router.route("/addHouseDetail").post(verifyJwt, upload.array("roomImage"), addDetails);

router.route("/removeDetails").post(verifyJwt, removeDetails);

router.route("/updateHouseDetails").post(verifyJwt, upload.array("roomImage"), updateRoomDetails);

export default router;

