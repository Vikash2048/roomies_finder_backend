import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    contact:{
        type: Number,
        required: true,
    },
    password:{
        type: Number,
        required: true,
    }
    
},{timestamps: true})