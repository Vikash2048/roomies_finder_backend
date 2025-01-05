import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { searchHouses, selectOne } from "../controllers/roomseeker.controllers.js";

const router = Router();

router.route("/searchHouse").get(verifyJwt, searchHouses);

router.route("/selectOne").get(verifyJwt, selectOne);



export default router;