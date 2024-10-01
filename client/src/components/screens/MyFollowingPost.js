import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import "../styles/Home.css"
let base_uri = process.env.REACT_APP_BASE_URL

export default function MyFollowingPost() {

    const navigate = useNavigate()
    var picLink = "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"

    const [data, setData] = useState([])
    const [comment, setComment] = useState("")
    const [show, setShow] = useState(false)
    const [item, setItem] = useState([])

    //Toast functions
    const notifyA = (data) => toast.success(data)
    // const notifyB = (data) => toast.error(data)

    useEffect(()=>{
        const token = localStorage.getItem("jwt")
        if(!token){
            navigate('/signin')
        }

        //fetching all the posts
        fetch(`${base_uri}/myfollowingpost`, {
          method: "get",
          headers: {
            "Content-Type" : "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
          }
        }).then(res=> res.json())
        .then(result => setData(result))
        .catch(err => console.log(err))
    },[])

    const toggleComment =(posts)=>{
        if(show){
          setShow(false)
        }else{
          setShow(true)
          setItem(posts)
        }
      }
  
  
      const likePost = (id)=>{
        fetch(`${base_uri}/like`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            postId: id
          })
        }).then(res => res.json())
        .then((result)=>{
          const newData = data.map((posts)=>{
            if(posts._id === result._id){
              return result
            }else{
              return posts
            }
          })
          setData(newData)  //here we are updating the data with likes so that it reflects in ui;
        })
      }
  
      //unlike post
  
      const unlikePost = (id)=>{
        fetch(`${base_uri}/unlike`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            postId: id
          })
        }).then(res => res.json())
        .then((result)=>{
          const newData = data.map((posts)=>{
            if(posts._id === result._id){
              return result
            }else{
              return posts
            }
          })
          setData(newData)  
        })
      }
  
      //comments
  
      const makeComment =(text, id)=>{
        fetch(`${base_uri}/comment`, {
          method: "put",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer "+ localStorage.getItem("jwt")
          },
          body: JSON.stringify({
            text: text,
            postId: id
          })
        }).then(res => res.json())
        .then((result)=>{
          const newData = data.map((posts)=>{
            if(posts._id === result._id){
              return result
            }else{
              return posts
            }
          })
          setData(newData)
          setComment("")
          notifyA("Comment Posted")
          console.log(result)
        })
      }

  return (
    <div className="home">
      {/* card  */}
      
      {data.map((posts)=>{
        return (
          <div className="card" key={posts._id} >
            {/* card header  */}
            <div className="card-header">
              <div className="card-pic">
                <img src={posts.postedBy.Photo ? posts.postedBy.Photo : picLink} alt="" />
              </div>
              <Link to={`/profile/${posts.postedBy._id}`} >
                <h5>{posts.postedBy.name}</h5>
              </Link>
            </div>

            {/* card image  */}
            <div className="card-image">
              <img src={posts.photo} alt="" />
            </div>

            {/* card content  */}
            <div className="card-content">
              {
                posts.likes.includes(JSON.parse(localStorage.getItem("user"))._id)
                ?
                (
                  <span className="material-symbols-outlined material-symbols-outlined-red" onClick={()=> unlikePost(posts._id)} >
                      favorite
                    </span>
                )
                :
                (
                  <span className="material-symbols-outlined " onClick={()=> likePost(posts._id)} >
                      favorite
                    </span>
                )
              }

              <p className='likes'>{posts.likes.length} likes</p>
              <p className='body-text'><span className='body-name'>{posts.postedBy.name}</span> {posts.body}</p>
              <p style={{fontWeight: "550", fontSize: "16px", cursor: "pointer"}} onClick={()=> toggleComment(posts)} >View all comments</p>
            </div>

              {/* add comments */}
              <div className="add-comment">
              {/* <span class="material-symbols-outlined">mood</span> */}
              <input type="text" placeholder='Add a comment' value={comment} onChange={(e)=> setComment(e.target.value)} />
              <button className="comment" onClick={()=> makeComment(comment, posts._id)} >
                Post
              </button>
              </div>

          </div>
        )
      })}

      {/* show comment --> modal opening or PostDetails Opening */}

      { show && (
        <div className="showComment">
          <div className="container">
            <div className="postPic">
              <img src={item.photo} alt="" />
            </div>

            <div className="details">

              {/* card header */}
              <div className="card-header" style={{borderBottom: "1px solid #00000029"}} >
                <div className="card-pic">
                  <img src={item.postedBy.Photo ? item.postedBy.Photo : picLink} alt="" />
                </div>
                <h5>{item.postedBy.name}</h5>
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
              <input type="text" placeholder='Add a comment' value={comment} onChange={(e)=> setComment(e.target.value)} />
              <button className="comment" onClick={()=> {
                makeComment(comment, item._id)
                toggleComment()
                }} >
                Post
              </button>
              </div>

            </div>
          </div>

          {/* close comment button */}
            <div className="close-comment" onClick={()=>{toggleComment()}}>
            <span class="material-symbols-outlined material-symbols-outlined-comment">close</span>
            </div>

        </div>
      )}

    </div>
  )
}
