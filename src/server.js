import { config } from "dotenv";
import { connectDB } from "./Core/db.js";
import { app } from "./app.js";


config(".env");
const PORT = process.env.PORT;

connectDB()
.then(() => {
    app.listen(PORT || 5000, () => {
        console.log("Server is successfully hosted");
    })
})
.catch((err) => {
    console.log("error while db connection...")
})

