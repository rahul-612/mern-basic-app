const express = require('express')
const router = express.Router();
require('../db/conn');
const User = require('../model/userSchema')
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const authenticate =require('../middleware/authenticate')

router.get("/", (req, res) => {    //yani agr hum home route p phuche to ky show ho
    res.send("hello world from the server");
})

//store user data
router.post("/register", async (req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;

    if (!name || !email || !phone || !work || !password || !cpassword) {
        //yani ek bhi field agr blank hogi to & 422-> the request was well formed but was unable to be followed due to semantic errors.
        return res.status(422).json({ error: "please fill all the fields" });
    }

    try {
        //checking is user already exist
        const userExist = await User.findOne({ email: email })
        if (userExist) {
            return res.status(422).json({ error: "email already exist!" });
        }else if(password!==cpassword){
            return res.status(422).json({ error: "Password are not matching"});
        }
        else{
            //iske andr user ka sara data save ho gya h
        const user = new User({ name, email, phone, work, password, cpassword });

        //hashing the user's password iska code userSchema m h

        await user.save();
        res.status(201).json({ message: "user has been registered successfully" })
        }
        
    }
    catch (err) {
        console.log(err);
    }

})

//Login aur post isliye kuki hum data ko frontend se backend m bhj rhe so basically create
router.post("/signin",async (req,res)=>{
    try{
        
        const { email,password } = req.body;
        if(!email || !password){
            return res.status(422).json({ error: "please fill all the fields" });
        }
        // console.log("hey im running")
       const userLogin= await User.findOne({ email})    //agr email match krta h to ye pura document as a response de deta h yeha p email:email ho rha

       //agr email same h
        if(userLogin){
            const isMatch=await bcrypt.compare(password,userLogin.password)  //user ne jo login krte wakt jo password diya wo phle argument hua aur dusra argument database wala h

           const token=await userLogin.generateAuthToken();
            console.log(token);
            
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+2589200000),
                httpOnly:true
            })

            if(!isMatch){
                res.status(400).json({error:"Invalid Credentials"})
            }else{
                res.json({message:"User Sign in Successfully!"})
            }
           
        }else{
            res.status(400).json({error:"Invalid Credentials"})
        }
       
    }catch(err){
        console.log(err)
    }
})

router.get("/about",authenticate,(req,res)=>{
    // res.send("hello about from the server");
    res.send(req.rootUser);
})
//get userData for contact us and homepage
router.get("/getData",authenticate,(req,res)=>{ 
    // res.send("hello contact from the server");
    res.send(req.rootUser);
})

router.post('/contact',authenticate,async (req,res)=>{
    try{
        const {name,email,phone,message}=req.body;

        
        if(!name || !email || !phone || !message){
            console.log("error in contact form")
            return res.json({error:"please fill the contact form"})
        }

        const userContact=await User.findOne({_id:req.userID})

        if(userContact){
            const userMessage=await userContact.addMessage(name,email,phone,message);
            await userContact.save();
            res.status(201).json({message:"user contact form submitted successfully!"})
        }

    }catch(err){
        console.log(err);
    }
})

router.get("/logout",(req,res)=>{ 
    res.clearCookie('jwtoken',{path:'/'})
   res.status(200).send("logout")
})

// router.get("/signup",(req,res)=>{ 
//     res.send("hello registration from the server");
// })

module.exports = router;



