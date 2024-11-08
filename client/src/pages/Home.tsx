import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { titleParse, url } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostsContainer from "../components/Layouts/PostsContainer";
import Navbar from "../components/Layouts/Navbar";
import { FormData } from "../utils/types";

const Home = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}/post?page=${page}&limit=9`
      );
      const data = await res.json();
      if (page === 1) {
        setPosts(data?.getAllPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.getAllPosts]);
      }
      setHasMore(data.getAllPosts.length > 0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading])

  return (
    <>
      <Navbar />
      <div style={{ width: "80%", margin: "0 auto" }}>
        {loading && page === 1 ? (
          <div className="skeleton-loading">
            <Skeleton count={5} />
          </div>
        ) : null}
      </div>
      <PostsContainer>
        {posts?.map((e, i) => (
          <Link to={`/${titleParse(e.title)}/${e._id}`} key={i}>
            <PostCard show={true} post={e} />
          </Link>
        ))}
      </PostsContainer>
      {loading && page > 1 && (
        <div className="skeleton-loading">
          <Skeleton count={5} />
        </div>
      )}
    </>
  );
};

export default Home;
