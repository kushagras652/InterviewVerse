import { Fragment,useEffect,useState } from "react"
import { useParams,Link } from "react-router-dom"
import { FormData } from "./Create"
import PostCard from "../components/PostCard"
import { url } from "../utils"

const SingleProfile = () => {
  const  {username} = useParams()
  const [userPosts,setUserPosts] = useState<FormData[]>([])
  const [userfound,setUserFound] = useState(false)

  useEffect(()=>{
  const userProfileHandler = async() =>{
    // WHat we are passing is the post id,we need to pass the user auth id,then only it can find the user using authRef,then we will populate it with his posts
    // First we need to find userAuth id
    const response = await fetch(`${url}/post/search/${username}`)
    console.log(response);
    if(response.status==200){
      const data = await response.json()
      setUserPosts(data)
    }
    if(response.status==404){
      setUserFound(true)
    }
  }
    userProfileHandler()
  },[])

  return (
    <div>
      {userfound ? (
        <h3>{username} not found</h3>
      )
    :  <Fragment>
      <h3 style={{padding : "1rem"}}>{username}</h3>
      <h3 className="center">
      List of all his interview experiences
      </h3>
      <main className="post-container">
        {userPosts.map((e,i)=>(
          <Link to={`${e._id}`}>
          <PostCard post={e} key={i} show={false} />
          </Link>
        ))}
      </main>
      </Fragment>
      }
    </div>
  )
}

export default SingleProfile