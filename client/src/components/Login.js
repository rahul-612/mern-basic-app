import React,{useState,useContext} from 'react'
import login_img from '../images/login.png';
import { NavLink,useHistory } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {UserContext} from '../App'


const Login = () => {
    const {state,dispatch}=useContext(UserContext);


    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const history=useHistory();


    const loginUser=async (e)=>{
        e.preventDefault();
    
        const res=await fetch("/signin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email,password}),
            credentials: 'include'
        });
        // console.log(res)
        const data=await res.json();

        if(res.status===404 || res.status===400 || res.status===422 || !data){
            window.alert("Invalid Credentials!");
        }else{
            dispatch({type:"USER",payload:true})
            window.alert("Login Successfully!");
            history.push("/");
        }
    }

    return (
      <>
        <section className="login flex main">
            <div className="login_container">
                <div className="login_img">
                        <figure>
                            <img src={login_img} alt="login image" />
                        </figure>
                        <NavLink to="/signup" className="signup-img-link">Create an Account</NavLink>
                </div>
                <div className="login_form_container">
                    <h2 className="form_title">sign in</h2>
                    <form method="POST" className="login_form" id="login_form" onSubmit={loginUser}>
                        <div className="form-group">
                            <label htmlFor="email"><EmailIcon /></label>
                            <input type="email" name="email" id="email" autoComplete="off" placeholder="Enter your email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password"><LockIcon /></label>
                            <input type="password" name="password" id="password" autoComplete="off" placeholder="Enter your password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
                        </div>
                        <div className="form-group form-button">
                            <input type="submit" value="login" name="signin" id="signin" className="form-submit btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </div>
        </section>
       
      </>
    )
}

export default Login
