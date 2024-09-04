import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
const app = express();

const PORT= process.env.PORT||3000
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log("Mongodb is connected");

}).catch((err)=>{
    console.log(err);
})

app.listen(PORT,()=>{
    console.log("Server is running on 3000 port");
})