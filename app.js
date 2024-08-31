const fs = require('fs');
const path = require('path');
require('dotenv').config();
const cors =require("cors");

require('express-async-errors');

const express=require("express")
const app=express();
const connectDb=require("./db/connection")

const gameRouter=require('./routes/game')
const errorHandlerMiddleware =require('./middleware/error-handler')
const notFound =require('./middleware/not-found')

// const uploadJsonFile=require('./controllers/uploadJson')
// // uploading json file json file
// const jsonFilePath = path.join(__dirname, 'json_files','case1.json'); // Replace with your actual file name
// uploadJsonFile('Shayara Bano v. Union of India (2017)',jsonFilePath);


app.use(cors({origin:"http://localhost:5173",credentials:true}))
//middleware
app.use(express.json());
  

//routes
app.use('/game',gameRouter)

app.use(notFound);
app.use(errorHandlerMiddleware)

//connect
const port=5000;
const start=async()=>{
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port,()=>{
            console.log(`server is listening on port number : ${port}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start();