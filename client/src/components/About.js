import React,{useEffect,useState} from 'react'
import about from '../images/about.png';
import {useHistory} from 'react-router-dom';

const About = () => {
    const [userData,setUserData]=useState({})
    const history =useHistory(); 
    const callAboutPage=async ()=>{
        try{
            const res=await fetch("/about",{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json",   
                },
                credentials:"include",
            });
            const data=await res.json() //ye sara data return krega us particular user ka
            // console.log(data);
            setUserData(data);

            if(!res.status===200){
                const error=new Error(res.error)
                throw error;
            }
        }catch(err){
            console.log(err);
            history.push('/login')
        }
    }



    useEffect(()=>{
        callAboutPage();
    },[])

    return (
        <>
        <section className="about flex main">
            <div className="container emp_profile">
                <form method="GET">
                    <div className="row">
                        <div className="col-md-4">
                            <img src={about} alt="user_img" className="user_img" width="185" />
                        </div>
                        <div className="col-md-6">
                            <div className="profile_head">
                                <h5>{userData.name}</h5>
                                <h6>{userData.work}</h6>
                                <p className="profile_rating mt-3 mb-5">RANKING: <span>1/10</span></p>
                              
                            </div>
                        </div>
                        <div className="col-md-2">
                            <input type="submit" name="btnAddMore" value="Edit Profile" id="" className="profile-edit-btn" />
                        </div>
                    </div>

                    <div className="row">
                        {/* Left Side URL */}
                        <div className="col-md-4">
                            <div className="profile-work">
                                <p>Work Link</p>
                                <a href="#">Youtube</a><br />
                                <a href="#">GitHub</a><br />
                                <a href="#">LinkedIn</a><br />
                                <a href="#">Instagram</a><br />
                                <a href="#">Facebook</a><br />
                            </div>
                        </div>
                        {/* Right Side data toggle */}
                        <div className="col-md-8 pl-5 about-info">
                            <div className="tab-content profile-tab" id="myTabContent">
                                <div className="tab-pane fade show active " id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <label >User-ID</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData._id}</p>
                                        </div>
                                    </div>
                                    
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label >Name</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.name}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label >Email</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.email}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label >Phone</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.phone}</p>
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-md-6">
                                            <label >Profession</label>
                                        </div>
                                        <div className="col-md-6">
                                            <p>{userData.work}</p>
                                        </div>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        </>
    )
}

export default About
