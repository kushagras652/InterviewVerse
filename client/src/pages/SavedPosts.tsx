import { useState, useEffect } from "react";
import { useTrackerContext } from "../context/context";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";
import { FormData } from "./Create";

const SavedPosts = () => {
  const { loggedInUser } = useTrackerContext();
  const [savedPosts, setSavedPosts] = useState<FormData[]>([]);
  const fetchSavePosts = async () => {
    const response = await fetch(
      `http://localhost:3000/post/savedPosts/${loggedInUser?.id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const data = await response.json();
    setSavedPosts(data);
  };

  useEffect(() => {
    fetchSavePosts();
  }, []);
  return (
    <>
    <h3 style={{padding : "2rem"}}>{savedPosts.length==0 && "No posts saved !!!"}</h3>
    <h2 className="center">Saved Posts</h2>
      <main className="post-container">
        {savedPosts.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`}>
            <PostCard post={e} key={i} show={true} />
          </Link>
        ))}
      </main>
    </>
  );
};

export default SavedPosts;
