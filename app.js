const dotenv=require("dotenv");
const express=require("express");
const app=express();
dotenv.config({path:'./config.env'});
require('./db/conn');
const User=require('./model/userSchema')
const port=process.env.PORT || 5000;
var cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cookieParser());    //browser se cookies ko access krne k liye
app.use(cors())

app.use(express.json());                // ye ek middleware h yani jo bhi data hum mil rha h postman se wo json format h to hamara application ni smjh rha to express k through usko json m convert kr rhe
app.use(require('./router/auth'))       //linking router files to make our route easy



if(process.env.NODE_ENV==="production"){
   app.use(express.static("client/build"));
}

app.listen(port,()=>{
    console.log(`server is running at port ${port}`)
})