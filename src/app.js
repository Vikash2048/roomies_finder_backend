import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

export const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    Credential:true
}))

// adding middlewares 
app.use(express.json({limit:"20kb"}));
// app.use(express.urlencoded({extends: true}));
app.use(express.static("public"));

app.use(cookieParser());



