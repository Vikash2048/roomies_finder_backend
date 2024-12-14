import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { USER_COLLECTION_NAME } from "../constant";


userSchema = new mongoose.Schema({
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
    }
},{timestamps: true, versionKey: false})



// methods

userSchema.pre("save", async function (next) {
    // for checking only if passwordd is change then bcrypt it
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password,10);
    next();
} )

// creating method to check that passwrod is correct or not 
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password,this.password);
}

// creating tokens 
userSchema.methods.generateAccessToken = async function(){
    jwt.sign(
        {
            _id: this._id,
            fullName: this.fullName,
            userName: this.userName,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expireIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = async function(){
    jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expireIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

const User = mongoose.model( USER_COLLECTION_NAME, userSchema );

export { User }

