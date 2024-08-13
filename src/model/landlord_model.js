import mongoose from "mongoose";
import { LANDLORD_COLLECTION } from "../constant";
import { required } from "joi";


const Schema=new mongoose.Schema({
    _userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
    description:{
        type:{
            price: {type: Number, required: true},
            roomType: {type:String, required: true},
            details:{type: String}
        },
        required: true
    }


},{timestamps:true,versionKey:false});


const Landlord = mongoose.model(LANDLORD_COLLECTION,Schema);

export default Landlord;