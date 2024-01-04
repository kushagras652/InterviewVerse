import { useTrackerContext } from "../context/context";
import { FormData } from "../pages/Create";
import { dateFormatter, defaultDp, timeToReadPost, url } from "../utils";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import savedIcon from '../assets/saved-icon.png'
import saveIcon from '../assets/save-icon.png'

type FullSinglePost = {
  singlePostObj?: FormData;
  show?: boolean;
};

const FullSinglePost = ({ singlePostObj, show }: FullSinglePost) => {
    const { id } = useParams();
    const {loggedInUser} = useTrackerContext()
 const {isAuthenticated} = useTrackerContext()
 const [present, setPresent] = useState(false);


  const removeSavedPost = async () => {
    const response = await fetch(
      `${url}/post/savedPosts/${loggedInUser?.id}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status == 200) {
      toast.success("Removed Successfully");
      // setTimeout(() => {
      //   navigate(`/saved-posts/${loggedInUser?.username}`);
      // }, 1000);
    }
  };

  const savePostHandler = async () => {
    const formData = {
      postId: id,
      userId: loggedInUser?.id,
    };
    if (isAuthenticated) {
      await fetch(`${url}/post/savedPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      toast.success("Saved Successfully");
    } else toast.error("Please Login to save");
  };

  const checkIfSavedPromise = async (): Promise<any> => {
    const response = await fetch(
      `${url}/post/savedPosts/check/${id}/${loggedInUser?.id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.text();
  };

  useEffect(()=>{
    const checkHandler = async()=>{
      const check = await checkIfSavedPromise();
      if (check == "true") setPresent(true);
      else setPresent(false);
    }
    if(isAuthenticated){
      checkHandler()
    }
  },[])

  return (
    <>
    <Toaster/>
    <main className="my-single-post">
      <h1>
        {singlePostObj?.topic}
        </h1>
      <span className="desc">{singlePostObj?.desc}</span>
      <br />
      <div className="full-post-detail-bar">
        <div className="dp-wrapper-profile-full-post">
        <div className="dp-wrapper-fullpost">
          <img src={defaultDp} alt="" loading="lazy"/>
        </div>
        <Link to={`/${singlePostObj?.username}`}>
          <span
          >
            {`${singlePostObj?.username}`}
            </span>
        </Link>
        &nbsp; 
        &nbsp; 
        <div style={{fontSize : "15px"}}>
        {dateFormatter(singlePostObj?.createdAt as Date | number | string)}
        &nbsp; 
        &nbsp; 
      {timeToReadPost(singlePostObj?.details)} min read
      {
        present ?  
        <div className="saved-icon" onClick={removeSavedPost}>
          <img src={savedIcon} loading="lazy" alt="" />
        </div>
          : 
        <div className="save-icon" onClick={savePostHandler}>
          <img src={saveIcon} alt="" />
        </div>
      }

        </div>
        </div>
      </div>
      <span>
<hr />
      </span>
      <br />
      <p>{singlePostObj?.details}</p>
      <div style={{textAlign : "center"}}>
        {singlePostObj?.tags?.map((e) => (
          <button key={e.id}>{e.name}</button>
        ))}
      </div>
      {show ? <h4>{singlePostObj?.username}</h4> : null}
    </main>
    </>
  );
};

export default FullSinglePost;
