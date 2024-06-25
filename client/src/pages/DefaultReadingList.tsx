import { useTrackerContext } from "../context/context"
import PostsContainer from "../components/Layouts/PostsContainer";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { url } from "../utils";
import useFetchHook from "../hooks/useFetchHook";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import Navbar from "../components/Layouts/Navbar";

function DefaultReadingList() {
  const {loggedInUser} = useTrackerContext()
  const {data,isLoading,error} = useFetchHook(`${url}/readingList/fetchPost/${loggedInUser?.id}`)
        
    return (
    <>
    <Navbar/>
    <div>
      <h4 className="mt-[2rem] text-center text-lg">Default Reading List</h4>
    </div>
    <h4 className="center" style={{marginTop : "2rem"}}>{error}</h4>
       <SkeletonLoader isLoading={isLoading}/>
          <PostsContainer>
        {data?.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`} key={i} >
            <PostCard post={e} show={true} />
          </Link>
        ))}
      </PostsContainer>
      </>
  )
}

export default DefaultReadingList