import { useEffect, useState } from "react";
import { useTrackerContext } from "../context/context";
import { Link } from "react-router-dom";
import Button from "./Button";
import defaultDp from '../img/defauldp.jpg'
import { url } from "../utils";

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

  return (
    <header className="header">
      <nav className="nav">
        <div className="navbar-left" onClick={closeModal}>
          <Link className="home" to="/">Home</Link>
          <Link className = "interview-track" to="/interview-tracks">Interview&nbsp;Tracks</Link>
          {
            isAuthenticated ? 
            <Link className="create" to={`/create`}>Create</Link>
            : null
          }
        </div>
        <div>
          {isAuthenticated ? (
            <div className="dp-wrapper-navbar">
              <div className="dp-wrapper" onClick={() => setShowModal((e) => !e)}>
                <img src={defaultDp} alt="dp" loading="lazy" />
              </div>
              {showModal && (
                <div
                  className="modal"
                  style={showModal ? { display: "block" } : { display: "none" }}>
                  <div className="modal-content" onClick={closeModal}>
                  {/* <Link to={`/${loggedInUser?.username}/my-profile`}>
                      My Profile
                    </Link> */}
                    <Link  to={`/me/lists`}>
                      Library
                    </Link>
                    <Link to={`/me/interview-tracks`}>
                      My Interviews
                    </Link>
                    <Button
                      onClick={() => {
                        localStorage.setItem("token", "");
                        window.location.href = "/";
                      }}
                      className="logout-btn"
                    >Logout</Button>
                  </div>
                </div>
              )}
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
