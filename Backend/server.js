//pckg imports
import express from 'express';
import dotenv from 'dotenv';

//file imports
import authRoutes from './Routes/auth.routes.js';
import messageRoutes from './Routes/message.routes.js';
import userRoutes from './Routes/user.routes.js';

import cookieParser from 'cookie-parser';
import connectToMongoDB from './db/connecttoMongoDB.js';

const app = express();
//PORT IS 8000
const PORT = process.env.PORT || 5000;

dotenv.config();

//middlewares down 2
app.use(express.json()); //to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);



// app.get('/', (req, res) => {
//     res.send("Hello there!");
// });


app.listen(PORT, () => {
    connectToMongoDB();
    console.log(`Server running on port ${PORT}!`);
});
