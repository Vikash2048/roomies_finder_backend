import mongoose from "mongoose";
import { landlord_collection } from "../constant";


const Schema=new mongoose.Schema({
    _userId:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    images:{
        type:[String],
        required:true,
    },
    userType:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },


},{timestamps:true,versionKey:false});


const model=mongoose.model(landlord_collection,Schema);

export default model;