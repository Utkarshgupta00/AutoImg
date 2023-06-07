import express from 'express';
import * as dotenv from 'dotenv'
import connectDB from './mongodb/connect.js';
import cors from 'cors'

import postRoutes from './routes/postRoutes.js'
import autoImgRoutes from './routes/autoImgRoutes.js'


dotenv.config();

const app = express();

const port = 3000;

app.use(cors());
app.use(express.json({limit: "50mb"}));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/autoImg',autoImgRoutes);

app.get('/', async(req,res)=>{
    res.send("hello from AutoImG");
})


const startServer = async() => {
    try{
        connectDB(process.env.MONGODB_URL);
        app.listen((port),()=>{
        console.log("server connected successfullly");
        })
    }catch(err){
        console.log(err);
    }

}

startServer();
