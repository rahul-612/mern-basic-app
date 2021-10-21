const mongoose=require("mongoose");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    work:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    messages:[
        {
            name:{
                type:String,
                required:true
            },
            email:{
                type:String,
                required:true
            },
            phone:{
                type:Number,
                required:true
            },
            message:{
                type:String,
                required:true
            },
        }
    ],
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


//middleware for hashing the password
userSchema.pre("save",async function(next){
    //save mtlb ki save(jo auth me data save ho rha h usse phle) se phle isko chlana h
    if(this.isModified('password')){
        //yani agr user ne password agr change kre ya phli br likha tbhi ye chle

        this.password=await bcrypt.hash(this.password,12);    //yani jo bhi user ka password tha usko hash kr diya aur usi m store kr diya
        this.cpassword=await bcrypt.hash(this.cpassword,12); 

        next(); //yani ab jha ye call hua uske next instructions execute ho jaye i.e user.save()
    }
})

//generating tokens
userSchema.methods.generateAuthToken= async function(){
    try{
        let token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token});  //dusra wala token jo generate krwa rhe h
        await this.save();
        return token;
        
    }catch(err){
        console.log(err);
    }
}

//store messages
userSchema.methods.addMessage=async function(name,email,phone,message){
    try{
        this.messages=this.messages.concat({name,email,phone,message})
        await this.save()
        return this.messages;
    }catch(err){
        console.log(err)
    }
}

const User=mongoose.model("user",userSchema);

module.exports=User;