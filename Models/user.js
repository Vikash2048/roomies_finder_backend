import mongoose, { Schema } from "mongoose";
import collection_name from "../Core/constants";
const modelSchema=new Schema({
    user_name:{
        type:String,
        required:true,
    },
    email_id:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    user_type:{
        type:String,
        required:true,
    },
    profile_picture:String,
    mobile:String,
    is_landlord:{
        type:Boolean,
        required:true
    }
    
},{
    timestamps:true,
    versionKey:false
});


const model=mongoose.model(collection_name.users_collection,modelSchema);