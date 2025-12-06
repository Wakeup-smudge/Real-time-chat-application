import express from "express";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";

import { connectDB } from "./src/lib/db.js";

import authRoutes from "./src/routes/auth.route.js";
import messageRoutes from "./src/routes/message.route.js"

dotenv.config();

const app = express();
const __dirname = path.resolve();

const PORT = process.env.PORT || 3000;

app.use(express.json()); //req.body
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// make ready for deployment
if(process.env.NODE_ENV === "production") {
    // server static frontend files
    app.use(express.static(path.join(__dirname, "/frontend/dist")))

    // for any non-API route , send index.html
app.get("*", (req,res) => {
    res.sendFile(path.join(__dirname,"/frontend/dist/index.html"))
})

}

app.listen(PORT, () => {
 console.log("Server running on port: ", +PORT)
connectDB()
});