import { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTrackerContext } from "../context/context";
import FullSinglePost from "../components/FullSinglePost";
import Button from "../components/Button";
import { FormData } from "./Create";
import { fetchSinglePostPromise, url } from "../utils";

const MySinglePost = () => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [singlePostObj,setSinglePostObj] = useState<FormData>()

  useEffect(() => {
  const fetchSinglePost = async () => {
    const data = await fetchSinglePostPromise(id);
    setSinglePostObj(data as any);
    sessionStorage.setItem("update-form",JSON.stringify(data))
  };
    fetchSinglePost();
  }, []);

  return (
    <Fragment>
    <div className="edit-div">
      <Link to="update">
        <Button label="Update" className="update-btn" />
      </Link>
      {/* <button onClick={() => setModal(true)}>Delete</button> */}
      <Button className="delete-btn" label="Delete" onClick={() => setModal(true)}/>
    </div>
    {singlePostObj && <FullSinglePost show = {false} singlePostObj = {singlePostObj} />}
        {/* Delete</Button> */}
      {modal ? <DeleteModal setModal={setModal} /> : null}
    </Fragment>
  );
};

export default MySinglePost;

type DeleteModalType = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteModal({ setModal }: DeleteModalType) {
  const { loggedInUser } = useTrackerContext();
  const navigate = useNavigate()
  const { id } = useParams();
  const deleteHandler = async () => {
    await fetch(`${url}/post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    // window.location.href = `/my-posts/${loggedInUser?.username}`; //* Causing a reload will not load the myposts
    navigate(`/my-posts/${loggedInUser?.username}`)
  };
  return (
    <div className="deleteModal">
      <div className="modalContent">
      <h2>
        This is a desctructive action,R u sure u wanna delete your interview
        track
      </h2>
      <Button label="Cancel" onClick={() => setModal(false)}/>
      <Button label="Delete" onClick={deleteHandler}/>
      </div>
    </div>
  );
}
