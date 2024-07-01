import { useEffect } from "react";
import { url } from "../utils";
import { useTrackerContext } from "../context/context";
import { useNavigate } from "react-router-dom";

function CheckAuthentication({children} : {children : React.ReactNode}) {
    const { loggedInUser, setLoggedInUser, setIsAuthenticated,setIsLoading,isLoading } = useTrackerContext();
    const navigate = useNavigate();

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
          if(response.status == 403){
            navigate("/")
          }
          if (response.ok) {
            const data = await response.json();
            setLoggedInUser({ username: data.username, id: data._id,dp : data?.dp });
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          setIsAuthenticated(false);
        } finally {
          setIsLoading(false);
        }
      };
  
      getProfile();
    }, [setLoggedInUser, setIsAuthenticated]);
  
    if (isLoading) {
      // While loading, show a loading indicator or skeleton UI
      return <div></div>;
    }
  
    return loggedInUser ? (
        // If logged in, show the dashboard
        <div>
            {children}
        </div>
      ) : null
}

export default CheckAuthentication