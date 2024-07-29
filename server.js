import { config } from "dotenv";
import { connectDB } from "./Core/db.js";
import { app } from "./app.js";

config(".env");

connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`server in running on port ${PORT}`)
})