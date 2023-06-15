import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTrackerContext } from "../context";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [topic, setTopic] = useState("");
  const [desc, setDesc] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [summary, setSummary] = useState("");
  const [username,setUsername] = useState("")
  const { baseUrl } = useTrackerContext();
  const navigate = useNavigate();
  const [state,setState] = useState(false)

  const submitHandler = async () => {
    try {
      await axios.post(`${baseUrl}/create`, {
        summary,
        topic,
        desc,
        mistakes,
        username
      });
      // console.log(response.data);
      setState((e)=>!e)
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  // We will set the username using localstorage
  useEffect(()=>{
      localStorage.setItem("user",JSON.stringify(username))
  },[state])

  return (
    <React.Fragment>
      <main className="input-container">
        <input type="text"
        placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <textarea
          spellCheck="false"
          rows="6"
          cols="69"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <textarea
          spellCheck="false"
          rows="6"
          cols="69"
          placeholder="Mistakes"
          value={mistakes}
          onChange={(e) => setMistakes(e.target.value)}
        />
        <input
          placeholder="Solution/Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <button className="btn" onClick={submitHandler}>
          Submit
        </button>
      </main>
    </React.Fragment>
  );
};

export default CreatePost;
