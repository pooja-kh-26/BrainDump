import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import path from "path";

import notesRoute from "./routes/notesRoute.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const __dirname = path.resolve();

//middleware
if (process.env.NODE_ENV !== "production") {
    app.use(
        cors({
            origin: "http://localhost:5173",
        })
    );
}

app.use(express.json()); // this middleware will parse the JSON bodies: req.body
app.use(rateLimiter);

//our custom simple middleware 
// app.use((req, res, next) => {
//     console.log(`Request Method is ${req.method} & Request URL is ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoute); // whenever we get a request to /api/notes we would like to go to notesRouter file

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));


    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}



connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server started on PORT:", PORT);
    })
})

