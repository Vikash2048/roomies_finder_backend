import mongoose from "mongoose";
import { LANDLORD_COLLECTION } from "../constant.js";


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
    roomImage:{
        type:[String],
        // required:true,
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
                nearLandMark: {type: String},
                extra_detail: {type: String} 
            },
            location:{
                lat: {type: String},
                lng: {type: String}
            },
        },
        _id:false,
        required: true
    }
},{timestamps:true,versionKey:false}); 


const Landlord = mongoose.model(LANDLORD_COLLECTION,Schema);

export default Landlord;