import React, { useContext, useEffect, useState } from 'react'
import '../styles/SignIn.css'
import logo from  '../../images/insta_logo.png'
import phoneImg from '../../images/insta_bg_img.png'
import { Link, useNavigate } from 'react-router-dom'
import { LoginContext } from '../../context/LoginState'
import { toast } from 'react-toastify'
let base_uri = process.env.REACT_APP_BASE_URL

export default function SignIn() {

    useEffect(()=>{
        const token = localStorage.getItem("jwt")
        if(token){
            navigate('/')
        }
    })

    const {setUserLogin} = useContext(LoginContext)

    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    //toast function
    const notifyA = (data) => toast.success(data)
    const notifyB = (data) => toast.error(data)

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    const postUser =()=>{

        //checking email
        if(!emailRegex.test(email)){
            notifyB("Invalid Email");
            return
        }

        fetch(`${base_uri}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email:email,
                password: password
            })
        }).then(response => response.json())
          .then(data => {
            if(data.error){
                notifyB(data.error)
            }else{
                notifyA(data.message)
                localStorage.setItem("jwt", data.token)
                localStorage.setItem("user", JSON.stringify(data.user))
                setUserLogin(true)
                navigate('/')
            }
          })
          .catch((error) => {
            console.log('Error :', error);
          });

    }

  return (
    <>
    <div className="box2">
        <div className="phone-img-div">
            <img className='phone-img' src={phoneImg} alt="" />
        </div>
        <div className="signIn-parent">
        <div className="signIn-box">
                <img className='logo-img' src={logo} alt="" />
            <div className="form-container2">
                <div className='input-div-2' >
                <input type="email" className='input-fields' name='email' placeholder='Email' value={email} onChange={(e)=> setEmail(e.target.value)}  />
                </div>
                <div className='input-div-2' >
                <input type="password" className='input-fields' name='password' placeholder='Password' value={password} onChange={(e)=> setPassword(e.target.value)}  />
                </div>
                <div className='button-div'>
                    <button class="button-65" role="button" onClick={()=> {postUser()}} >Log in</button>
                </div>
            </div>
            
        </div>
        <div className="have-acc-2">
            <p className='have-acc-text-2'>Don't have an account ?<Link className='link' to={'/signup'}> <span className='log-in'>Sign up</span> </Link> </p>
        </div>
        </div>
        
    </div>
    </>
  )
}
