import React,{useState,useEffect} from 'react'

const Home = () => {

    const [userName,setUserName]=useState('')
    const [show,setShow]=useState(false)

    const userHome=async ()=>{
        try{
            const res=await fetch("/getData",{
                method:"GET",
                headers:{  
                    "Content-Type":"application/json",   
                },
               
            });
            const data=await res.json() //ye sara data return krega us particular user ka
            // console.log(data);
            setUserName(data.name);
            setShow(true)
            if(!res.status===200){
                const error=new Error(res.error)
                throw error;
            }
        }catch(err){
            console.log(err);
           
        }
    }
    useEffect(()=>{
        userHome();
    },[])


    return (
        <section className="home main flex">   
            <p>WELCOME</p>
            <h1>{userName}</h1>
            <h2>{show?'Happy, to see you back':'We Are The MERN Developer'}</h2>
            
        </section>
    )
}

export default Home
