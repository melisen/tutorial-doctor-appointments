import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js'

dotenv.config()
const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
    origin:true   //para acceder al servidor de manera local
}
//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));




mongoose.set('strictQuery', false);
const connectDB = async()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongoDB database is connected")
    }catch(err){
console.log("MongoDB database connection failed")
    }
}



app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)

//probar tanto en navegador como en Thunderclient la url "localhost:5000" (sin http:/www)
app.get('/', (req, res)=>{
    res.send('Api is working')
})

app.listen(port, ()=>{
    connectDB()
    console.log('server is running on port ', port)
})