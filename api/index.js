import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import userRouter from './Routers/user.router.js'
import authRouter from './Routers/auth.router.js'
const app = express();

app.use(express.json());

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

app.use('/api/user',userRouter);
app.use('/api/auth' ,authRouter );

app.use((err, req, res, next)=>{
    const statusCode= err.statusCode||500
    const message= err.message||"Internal server problem"

    res.status(statusCode).json({
        success:false,
        statusCode,
        message,

    });
});