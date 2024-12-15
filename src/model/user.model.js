import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_COLLECTION_NAME } from "../constant.js";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        lower: true,
    },
    mobile:{
        type: Number,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    userType:{
        type: String,
        enum: ["Landlord", "Roommate Seeker", "Room Seeker"],
        required: true
    },
    avatar:{
        type: String,
    },
    refreshToken:{
        type: String,
    }
},{timestamps: true, versionKey: false})

// methods

userSchema.pre("save", async function (next) {
    // for checking only if passwordd is change then bcrypt it
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
} )

// creating method to check that passwrod is correct or not 
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}

// creating tokens 
userSchema.methods.generateAccessToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model( USER_COLLECTION_NAME, userSchema );

export { User }

