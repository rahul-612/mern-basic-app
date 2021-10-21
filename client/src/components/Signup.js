import React,{useState} from 'react'
import signup from '../images/signup.png';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import LockIcon from '@mui/icons-material/Lock';
import { NavLink,useHistory } from 'react-router-dom'

const Signup = () => {
    const history=useHistory();
    const [user,setUser]=useState({
        name:"",
        email:"",
        phone:"",
        work:"",
        password:"",
        cpassword:""
    })

    let name,value;

    const handleinputs=(e)=>{
        name=e.target.name;     //yani jo bhi input field user type krega to us input field ka jo name hoga wo fetch kr k 'name' m store kr rhe h

        value=e.target.value;   //user ne jo type kiya wo

        setUser({...user,[name]:value});    //'...user' mtlb phele wala data ya aur field k data second paramete [name]:value yani name jo h us field ka aur value as a key and value pass kr rhe

    }

    const postData=async (e)=>{
        e.preventDefault();
        const {name,email,phone,work,password,cpassword}=user;

        //ye hum data auth k /register m bhj rhe h
        const res=await fetch("http://localhost:5000/register",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,phone,work,password,cpassword}) //kuki browser ko json data smjh ni ata to usko string m convert kr rhe h aur yeha  p 'name':'name' store ho rha h pr jb key value same hote h to hume ek bhi likhe se kaam chl jata h
        });

        const data=await res.json();

        if(res.status===422||!data){
            window.alert("Invaild Registration");
            console.log("Invalid Registration");
        }else{
            window.alert("Registration Successfull");
            console.log("Registration Successfull");

            history.push('/')
        }
    }

    return (
        <section className="signup flex main">
            <div className="signup_container">
                <div className="signup_form">
                    <h2 className="form_title">sign up</h2>
                    <form method="POST" className="register_form" id="register_form">
                        <div className="form-group">
                            <label htmlFor="name"><PersonIcon /></label>
                            <input type="text" name="name" id="name" autoComplete="off" placeholder="Enter your name" value={user.name} onChange={handleinputs}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email"><EmailIcon /></label>
                            <input type="email" name="email" id="email" autoComplete="off" placeholder="Enter your email" value={user.email} onChange={handleinputs}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phone"><PhoneAndroidIcon /></label>
                            <input type="number" name="phone" id="phone" autoComplete="off" placeholder="Enter your mobile" value={user.phone} onChange={handleinputs}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="work"><SlideshowIcon /></label>
                            <input type="text" name="work" id="work" autoComplete="off" placeholder="Enter your profession" value={user.work} onChange={handleinputs}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"><LockIcon /></label>
                            <input type="password" name="password" id="password" autoComplete="off" placeholder="Enter your password" value={user.password} onChange={handleinputs}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpassword"><LockIcon /></label>
                            <input type="password" name="cpassword" id="cpassword" autoComplete="off" placeholder="Confirm password" value={user.cpassword} onChange={handleinputs} />
                        </div>
                        <div className="form-group form-button">
                            <input type="submit" value="register" name="signup" id="signup" className="form-submit btn btn-primary" onClick={postData} />
                        </div>
                    </form>
                </div>
                <div className="signup_img">
                    <figure>
                        <img src={signup} alt="registration image" />
                    </figure>
                    <NavLink to="/login" className="signup-img-link">I am already register</NavLink>
                </div>
            </div>
        </section>
    )
}

export default Signup
