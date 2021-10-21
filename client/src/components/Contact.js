import React,{useState,useEffect} from 'react'
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';

const Contact = () => {
    
    const [userData,setUserData]=useState({name:"",email:"",phone:"",message:""})
     
    const userContact=async ()=>{
        try{
            const res=await fetch("/getData",{
                method:"GET",
                headers:{  
                    "Content-Type":"application/json",   
                },
               
            });
            const data=await res.json() //ye sara data return krega us particular user ka
            // console.log(data);
            setUserData({...userData,name:data.name,email:data.email,phone:data.phone,message:data.message});

            if(!res.status===200){
                const error=new Error(res.error)
                throw error;
            }
        }catch(err){
            console.log(err);
           
        }
    }
    useEffect(()=>{
        userContact();
    },[])

    //we are storing data in states
    const handleInputs=(e)=>{
        const name=e.target.name;
        const value=e.target.value;

        setUserData({...userData,[name]:value})
    }
    
    //sending data to backend
    const contactForm=async (e)=>{
        // alert(userData.message)
        e.preventDefault();

        const {name,email,phone,message}=userData;
      
        const res=await fetch('/contact',{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name,email,phone,message})
        })

        const data=await res.json();

        if(!data){
            console.log("Message Not Sent");
        }else{
            alert("Message Sent!");
            setUserData({...userData,message:""})
        }

    }

    return (
        <>
        <section className="contact main flex">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-10 offset-lg-1 d-flex justify-content-between mb-4">
                            {/* phone number */}
                        <div className="contact_info_item d-flex justify-content-start align-item-center">
                            <label htmlFor="phone" className="mt-3 ms-2"><PhoneAndroidIcon/></label>
                            <div className="contact_info_content mt-2 ms-4">
                                <div className="contact_info_title">Phone</div>
                                <div className="contact_info">{userData.phone?userData.phone:'User Phone'}</div>
                            </div>
                        </div>
                        {/* email */}
                        <div className="contact_info_item d-flex justify-content-start align-item-center">
                        <label htmlFor="email" className="mt-3 ms-2"><EmailIcon/></label>
                            <div className="contact_info_content  mt-2 ms-4">
                                <div className="contact_info_title">Email</div>
                                <div className="contact_info">{userData.email?userData.email:'User Email'}</div>
                            </div>
                        </div>
                        {/* address */}
                        <div className="contact_info_item d-flex justify-content-start align-item-center">
                            <label htmlFor="address" className="mt-3 ms-2"><HomeIcon/></label>
                            <div className="contact_info_content  mt-2 ms-4">
                                <div className="contact_info_title">Address</div>
                                <div className="contact_info">New Delhi</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* contact us form */}
            <div className="contact_form_main mt-4 main">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-10 offset-lg-1">
                            <div className="contact_form_container">
                                <div className="contact_form_title">Get in Touch</div>
                                <form id="contact_form" method="POST" onSubmit={contactForm}>
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type="text" name="name" id="contact_form_name" className="contact_form_name input_field" placeholder="Your Name" value={userData.name} required="true" onChange={handleInputs} readOnly/>

                                        <input type="email" name="email" id="contact_form_email" className="contact_form_email input_field" placeholder="Your Email" value={userData.email} required="true" onChange={handleInputs} readOnly/>

                                        <input type="phone" name="phone" id="contact_form_phone" className="contact_form_phone input_field" placeholder="Your Phone" value={userData.phone} required="true" onChange={handleInputs} readOnly/>
                                    </div>

                                    <div className="contact_form_text mt-4">
                                        <textarea name="message" id="" cols="108" rows="08" className="text_field contact_form_message" placeholder="Message" value={userData.message} onChange={handleInputs} ></textarea>
                                    </div>
                                    <div className="contact_form_button">
                                        <button type="submit" className="button contact_submit_button">Send Message</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

export default Contact
