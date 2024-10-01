import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginContext } from '../../context/LoginState'
import "../styles/CreatePost.css"
let base_uri = process.env.REACT_APP_BASE_URL;

export default function CreatePost() {

    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [url, setUrl] = useState("")
    const navigate = useNavigate()
    var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"

    const {loggedUser} = useContext(LoginContext)

    //Toast functions
    const notifyA = (data)=> toast.success(data)
    const notifyB = (data)=> toast.error(data)
    
    //useEffect
    useEffect(()=>{
        //saving post to mongodb
        if(url){
            fetch(`${base_uri}/createPost`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+ localStorage.getItem("jwt")
                },
                body: JSON.stringify({
                    body, pic:url
                })
            }).then(res => res.json())
            .then((data)=>{
                if(data.error){
                    notifyB(data.error)
                }else{
                    notifyA("Successfully Posted")
                    navigate('/')
                }
            })
            .catch(err=> console.log(err))
        }
    }, [url])   //this useEffect is triggered --> 1. at the loading of the page 2. wheneever the dependecies changes // here 
    //useEffect is triggered when 'url' state variable changes

    //posting image to cloudinary
    const postDetails =()=>{
        console.log(body, image);
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "instagram")
        data.append("cloud_name", "vishalranjan")

        fetch("https://api.cloudinary.com/v1_1/vishalranjan/image/upload", {
            method: "post",
            body: data
        }).then(res => res.json())
        .then(data => setUrl(data.url))
        .catch(err => console.log(err))
    }

    const loadfile = (event)=>{
        const output = document.getElementById('output');
        output.src = URL.createObjectURL(event.target.files[0]);  //this line is responsible for the image displayed in preview;
        output.onload = function(){
            URL.revokeObjectURL(output.src)  //free memory
        }
    }


  return (
    <div className='createPost' >

        {/* header */}
        <div className="post-header">
            <h4 style={{margin: "3px auto"}} >Create New Post</h4>
            <button id='post-btn' onClick={()=>{postDetails()}} >Share</button>
        </div>

        {/* image preview */}
        <div className="main-div">
            <img src="https://cdn-icons-png.flaticon.com/512/1160/1160358.png" alt="" id='output' />
            <input type="file" accept='image/*'
            onChange={(event)=>{
                loadfile(event)
                setImage(event.target.files[0])
            }}
             />
        </div>

        {/* details */}
            <div className="details">
                <div className="card-header">
                    <div className="card-pic">
                        <img className='card-img' src={loggedUser.Photo ? loggedUser.Photo: picLink} alt="" />
                    <h5>{JSON.parse(localStorage.getItem("user")).name}</h5>
                    </div>
                </div>
                <textarea type="text" placeholder='Write a caption' value={body} onChange={(e)=>{setBody(e.target.value)}} ></textarea>
            </div>

    </div>
  )
}
