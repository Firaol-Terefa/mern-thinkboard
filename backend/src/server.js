
import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
// use whe
// import rateLimiterMiddleware from './middleware/rateLimiter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;  // default port is 5001
const __dirname = path.resolve(); // get the current directory name

//use middleware
if (process.env.NODE_ENV !== "production") {
        app.use(
        cors({
        origin: "http://localhost:5173", // allow requests from this origin
    })
  );
}
app.use(express.json());
app.use(rateLimiter);// apply rate limiting middleware
// use th ebelow middleware when you need offline 
// app.use(rateLimiterMiddleware);


app.use("/api/notes", notesRoutes);
if(process.env.NODE_ENV === "production"){
app.use(express.static(path.join(__dirname,"../frontend/dist")));  // ✅ Correct

    app.get('*',(req,res) => {
   res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  }
);
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    });
})
