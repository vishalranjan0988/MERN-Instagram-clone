import React from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "../styles/PostDetail.css"
let base_uri = process.env.REACT_APP_BASE_URL

export default function PostDetail({item, user, toggleDetails}) {
    const navigate = useNavigate()
    var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"

    //Toast notification
    const notifyA = (data) => toast.success(data)
    const notifyB = (data) => toast.error(data)

    const removePost =(postId) =>{
        if(window.confirm("Do you really want to remove this post ?")){
            fetch(`${base_uri}/deletePost/${postId}`, {
                method: "delete",
                headers: {
                    "Authorization": "Bearer "+ localStorage.getItem("jwt")
                },
            })
            .then((res)=> res.json())
            .then((result)=>{
                console.log(result)
                toggleDetails();
                navigate('/')
                notifyA(result.message)
            })
        }
    }

  return (
    <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>

            <div className="details">

              {/* card header */}
              <div className="card-header" style={{borderBottom: "1px solid #00000029"}} >
                <div className="card-pic">
                  <img src={user.Photo ? user.Photo : picLink} alt="" />
                </div>
                <h5>{user.name}</h5>
                <div className="deletePost">
                <span class="material-symbols-outlined" onClick={()=>{removePost(item._id)}} >
                    delete</span>
                </div>
              </div>

              {/* comment section */}
              <div className="comment-section" style={{borderBottom: "1px solid #00000029"}} >
                {item.comments.map((comment)=>{
                  return (
                    <p className="comm" key={comment._id}>
                      <span className="commenter" style={{fontWeight: "bolder"}} >{comment.postedBy.name} </span>
                      <span className="commentText">{comment.comment}</span>
                    </p>
                  )
                })}
              </div>

              {/* card content */}

              <div className="card-content">
                <p>{item.likes.length} likes</p>
                <p>{item.body}</p>
              </div>

              {/* add comments */}
              <div className="add-comment">
              <span class="material-symbols-outlined">mood</span>
              <input type="text" placeholder='Add a comment' />
              <button className="comment" >
                Post
              </button>
              </div>

            </div>
          </div>

          {/* close comment button */}
            <div className="close-comment" onClick={()=>{toggleDetails()}}>
            <span class="material-symbols-outlined material-symbols-outlined-comment">close</span>
            </div>

        </div>
  )
}
