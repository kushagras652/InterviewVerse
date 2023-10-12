import { useEffect, useState } from "react";
import { useTrackerContext } from "../context/context";
import { Link } from "react-router-dom";
import Button from "./Button";
import defaultDp from '../img/defauldp.jpg'

const Navbar = () => {
  const { loggedInUser, setLoggedInUser, setIsAuthenticated } =
    useTrackerContext();
  const [showModal, setShowModal] = useState(false);

  const getProfile = async () => {
    const response = await fetch(`http://localhost:3000/auth/me`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    // console.log(response.status);
    if (response.status != 403) {
      const data = await response.json();
      setLoggedInUser({ username: data.username, id: data._id });
      setIsAuthenticated(true);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <header className="header">
      <nav className="nav">
        <div>
          <Link className="home" to="/">Home</Link>
          <Link className = "create" to="create">Create</Link>
        </div>
        <div>
          {loggedInUser?.username?.length ?? 0 > 1 ? (
            <>
              <div className="dp-wrapper" onClick={() => setShowModal((e) => !e)}>
                <img src={defaultDp} alt="dp" loading="lazy" />
              </div>
              {showModal && (
                <div
                  className="modal"
                  style={showModal ? { display: "block" } : { display: "none" }}
                >
                  <div className="modal-content">
                  <Link to={`/${loggedInUser?.username}`}>
                      {/* {loggedInUser?.username} */}
                      My Profile
                    </Link>
                    <Link  to={`/saved-posts/${loggedInUser?.username}`}>
                      Saved Posts
                    </Link>
                    <Link to={`/my-posts/${loggedInUser?.username}`}>
                      My Posts
                    </Link>
                    <Button
                      onClick={() => {
                        localStorage.setItem("token", "");
                        window.location.href = "/";
                      }}
                      label="Logout"
                      className="logout-btn"
                    />
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ padding: "1rem",fontSize : "1.2rem"}}>
              <Link to="/register" style={{fontWeight : 600,marginRight : "1rem"}}>SignUp</Link>
              <Link to="/login" style={{fontWeight : 600}}>Login</Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
