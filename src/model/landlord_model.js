import mongoose from "mongoose";
import { LANDLORD_COLLECTION } from "../constant";


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
    mobile:{
        type:String,
        required:true,
    },
    description:{
        type:{
            price: {type: Number, required: true},
            roomType: {type: String, enum: ["PG", "Flat"], required: true},
            roomFor: {type:String, required: true, enum:["boys", "girl", "unisex"]},
            details: {
                bhk: {type: String, required: true},
                near_landmark: {type: String, required: true},
                extra_detail: {type: String} 
            }
        },
        required: true
    }


},{timestamps:true,versionKey:false});


const Landlord = mongoose.model(LANDLORD_COLLECTION,Schema);

export default Landlord;