import mongoose from "mongoose"
import { DB_NAME } from "../constant.js";

export const connectDB = async () => {
    try{
        const dbConnectionInstance = await mongoose.connect(`${process.env.DB_URI}/${DB_NAME}`);
        console.log(`MongoDB database connected successfully ... \n db hosted on ${dbConnectionInstance.connection.host} \n db port number : ${dbConnectionInstance.connection.port} \n db name is : ${dbConnectionInstance.connection.name}` );
    } catch (err) {
        console.log("ERROR WHILE CONNECTING TO THE DB ",err.message);
        process.exit(1);  // this indicate that process fail
    }
}