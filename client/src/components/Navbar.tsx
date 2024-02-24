import { useEffect, useState } from "react";
import { useTrackerContext } from "../context/context";
import { Link } from "react-router-dom";
import defaultDp from '../img/defauldp.jpg'
import { url } from "../utils";
import { Draft } from "./Icons/Draft";
import { BookMarkIcon } from "./Icons/Bookmark";
import { CreatePostIcon } from "./Icons/CreatePost";
import { LogoutIcon } from "./Icons/Logout";

const Navbar = () => {
  const { setLoggedInUser, setIsAuthenticated,isAuthenticated } =
    useTrackerContext();
  const [showModal, setShowModal] = useState(false);
  const [isLoading,setIsLoading] = useState(false)

  useEffect(() => {
  const getProfile = async () => {
    setIsLoading(true)
    try {
      
      const response = await fetch(`${url}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.status != 403) {
        const data = await response.json();
        setLoggedInUser({ username: data.username, id: data._id });
        setIsAuthenticated(true);
      }
    } catch (error) {
      
    }
    finally{
      setIsLoading(false)
    }
  };
    getProfile();
  }, []);

  const closeModal = () =>{
    setShowModal(false)
  }

  const logouthandler = () =>{
    sessionStorage.clear()
    localStorage.setItem("token", "");
    window.location.href = "/";
  }

  return (
    <header className="header">
      <nav className="nav">
        <div className="navbar-left" onClick={closeModal}>
          <Link className="home" to="/">Home</Link>
          <Link className = "interview-track" to="/interview-tracks">Interview&nbsp;Tracks</Link>
        </div>
        <div>
          {/* {
            isAuthenticated ? 
            : null
          } */}
          {isAuthenticated ? (
            <div className="right-nav-div">
            <Link className="icon create-icon" to={`/new-post`}>
              <span>
                <CreatePostIcon />
              </span>
              Create
              </Link>
            <div className="dp-wrapper-navbar">
              <div className="dp-wrapper" onClick={() => setShowModal((e) => !e)}>
                <img src={defaultDp} alt="dp" loading="lazy" />
              </div>
              {showModal && (
                <div
                  className="modal"
                  style={showModal ? { display: "block" } : { display: "none" }}>
                  <div className="modal-content" onClick={closeModal}>
                    <Link  to={`/me/lists`} className="icon">
                      <span>
                        <BookMarkIcon/>
                      </span>
                      Bookmarks
                    </Link>
                    <Link to={`drafts`} className="icon">
                      <span>
                      <Draft/>
                      </span>
                     Drafts
                    </Link>
                    <Link to={`/me/interview-tracks`} className="icon">
                      <span>
                        <Draft/>
                      </span>
                      My Interviews
                    </Link>
                    {/* <div className="logout-btn-container"> */}
                    <a
                    onClick={logouthandler}
                    className="logout-icon icon"
                    >
                        <span>
                        <LogoutIcon/>
                        </span>
                        Logout</a>
                      </div>
                  </div>
                // </div>
              )}
            </div>
            </div>
          ) : 
          null
                    }
                    {
                      !isLoading && !isAuthenticated ? 
            <div className="signupbar" 
            >
              <Link to="/register" style={{fontWeight : 600,marginRight : "1rem"}}>SignUp</Link>
              <Link to="/login" style={{fontWeight : 600}}>Login</Link>
            </div>
                      : null
                    }
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
