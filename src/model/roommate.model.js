import mongoose from "mongoose";
import { ROOMMATE_COLLECTION } from "../constant.js";

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
    roomImage: {
        type: [String],
        required: true
    },
    description:{
        type:{
            price: {type: Number, required: true},
            roomType: {type: String, enum: ["PG", "Flat"], required: true},
            roomFor: {type:String, enum:["boys", "girl", "unisex"], required: true},
            details: {
                bhk: {type: String, required: true},
                near_landmark: {type: String,},
                extra_detail: {type: String},
                ownerName: {type: String, required: true}, 
                ownerMobile: {type: Number, required: true}
            },
            location:{
                lat: {type: Number},
                lng: {type: Number}
            },
        },
        _id:false,
        required: true
    }

},{timestamps:true,versionKey:false});
// Add geospatial index for location field
schema.index({ 'description.location': '2dsphere' });

export const Roommate = mongoose.model(ROOMMATE_COLLECTION,schema);