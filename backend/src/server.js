
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";
// use whe
// import rateLimiterMiddleware from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;  // default port is 5001

//use middleware
app.use(
    cors({
    orogin: "http://localhost:5173", // allow requests from this origin
}));
app.use(express.json());
app.use(rateLimiter);// apply rate limiting middleware
// use th ebelow middleware when you need offline 
// app.use(rateLimiterMiddleware);


app.use("/api/notes", notesRoutes);
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
})
