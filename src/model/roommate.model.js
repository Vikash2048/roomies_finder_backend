import mongoose from "mongoose";
import { ROOMMATE_COLLECTION } from "../constant";

const schema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    description:{
        type:{
            price: {type: Number, required: true},
            roomType: {type:String, required: true},
            details: {
                bhk: {type: String, required: true},
                near_landmark: {type: String, required: true},
                extra_detail: {type: String},
                ownerName: {type: String, required: true}, 
                ownerMobile: {type: Number, required: true}
            }
        },
        required: true
    }

},{timestamps:true,versionKey:false});

export const RoommateFinder = mongoose.model(ROOMMATE_COLLECTION,schema);