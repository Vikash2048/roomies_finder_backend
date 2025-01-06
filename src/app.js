import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential:true
}))
app.use(express.json({limit:"50kb"}));
app.use(express.urlencoded({extends: true}));
app.use(express.static("public"));
app.use(cookieParser())


// decalaration of routes 
import userRouter from "./routes/user.router.js"
import landlordRouter from "./routes/landlord.router.js"
import roomateseekerRouter from "./routes/roomateseeker.router.js"
import roomseekerRouter from "./routes/roomseeker.router.js"

app.use("/api/v1/user", userRouter);

app.use("/api/v1/landlord", landlordRouter);

app.use("/api/v1/roomateseeker", roomateseekerRouter);

app.use("/api/v1/roomseeker", roomseekerRouter);


app.use(cookieParser());



