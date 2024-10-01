import React, { useEffect, useState } from 'react'
import '../styles/SignUp.css'
import logo from  '../../images/insta_logo.png'
import {toast} from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
let base_uri = process.env.REACT_APP_BASE_URL

export default function SignUp() {

    useEffect(()=>{
        const token = localStorage.getItem("jwt")
        if(token){
            navigate('/')
        }
    })

    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    //toast functions
    const notifyA = (data)=> toast.success(data)
    const notifyB = (data)=> toast.error(data)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/

    const postUser =()=>{

        //checking email and password
        if(!emailRegex.test(email)){
            notifyB('Invalid email');
            return
        }else if(!passwordRegex.test(password)){
            notifyB('Password must contain at least 8 characters, including at least 1 number and must include both lower and uppercase letters and special characters for example #,?,! ');
            return
        }

        fetch(`${base_uri}/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                userName: userName,
                password: password
            })
        }).then(response => response.json())
          .then(data =>{
            if(data.error){
                notifyB(data.error)
            }else{
                notifyA(data.message)
                navigate('/signin')
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    }
  return (
    <>
    <div className="box">
        <div className="signUp-box">
                <img className='logo-img' src={logo} alt="" />
            <div className="form-container">
                <p className='signUp-para'>Sign up to see photos and videos from your friends.</p>
                <div className='input-div' >
                <input type="email" className='input-fields' name='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div className='input-div' >
                <input type="text" className='input-fields' name='name' placeholder='Full Name' value={name} onChange={(e)=> setName(e.target.value)}  />
                </div>
                <div className='input-div' >
                <input type="text" className='input-fields' name='userName' placeholder='Username' value={userName} onChange={(e)=> setUserName(e.target.value)}  />
                </div>
                <div className='input-div' >
                <input type="password" className='input-fields' name='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)} />
                </div>
                <div className='pp-text'>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</div>
                <div className='button-div'>
                    <button class="button-65" role="button" onClick={()=> {postUser()}} >Sign up</button>
                </div>
            </div>
        </div>
        <div className="have-acc">
            <p className='have-acc-text'>Have an account ? <Link className='link' to={'/signin'}> <span className='log-in'>Log in</span> </Link> </p>
        </div>
    </div>
    </>
  )
}
