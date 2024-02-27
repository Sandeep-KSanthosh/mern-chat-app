// server.js
import path from "path";

import express from "express";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'; // Import cookie-parser

import authRoutes from "./routes/auth.routes.js";
import MessageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server} from "./socket/socket.js";


// Add cookie-parser middleware
app.use(cookieParser());

const PORT = process.env.PORT || 5000;
const __dirname=path.resolve();

dotenv.config();

app.use(express.json());

// console.log("MongoDB URI:", process.env.MONGO_DB_URI);

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// });

app.use("/api/auth", authRoutes);
app.use("/api/messages", MessageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")))



app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"))
})

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
});
