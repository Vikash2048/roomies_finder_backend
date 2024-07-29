import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.DB_URI)
    .then(()=>{
        console.log("Database is connected ..");
    })
    .catch((error) => {
        console.log("error while connecting to the DB",error.message);
    })
}