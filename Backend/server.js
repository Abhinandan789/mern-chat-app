//pckg imports
import path from "path";
import express from 'express';
import dotenv from 'dotenv';

//file imports
import authRoutes from './Routes/auth.routes.js';
import messageRoutes from './Routes/message.routes.js';
import userRoutes from './Routes/user.routes.js';

import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connecttoMongoDB.js';
import { app,server } from './socket/socket.js';

//PORT IS 8000
const PORT = process.env.PORT || 5000;

//DEPLOYMENT PART OF CODE
const __dirname = path.resolve();

dotenv.config();

//middlewares down 2
app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

//DEPLOYMENT PART OF CODE
app.use(express.static(path.join(__dirname,"/Frontend/dist"))); 
//{this will put everything in the chat-app/frontend/dist in the dist folder every sgatic code file in dist folder 
//or this sets up Express.js to serve static files from the specified directory (frontend/dist) using the express.static middleware. So any files in the frontend/dist directory, such as HTML, CSS, JavaScript, images, etc., will be accessible from the web server.}

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname, "Frontend", "dist", "index.html"));
}); //with this we can now run our application with server too 


server.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}!`);
});
