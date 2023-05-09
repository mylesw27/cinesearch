import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Widget } from "@uploadcare/react-widget";
import logo from "../assets/logo.png";

import axios from "axios";

export default function Profile(props) {
  // state for the secret message (aka user privilaged data)
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: props.name,
    email: props.email,
    password: props.password,
    userName: props.userName,
    img: props.img,
  });
  const jwt = localStorage.getItem("jwt");

  const navigate = useNavigate();

  async function handleFileSelect(file) {
    try {
      const fileInfo = await file.promise();
      const cdnUrl = fileInfo.cdnUrl;
      setUserData({ ...userData, img: cdnUrl }, () => {});
      // Make a POST request to update the currentUser object with the UUID of the uploaded image
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect for getting the user data and checking auth
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        const headers = { Authorization: token };
        const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`;
        const response = await axios.get(url, { headers });
        props.setMsg(response.data.msg);
      } catch (err) {
        // if the error is a 401 -- that means that auth failed
        console.warn(err);
        if (err.response) {
          if (err.response.status === 401) {
            // panic!
            props.handleLogout();
            // send the user to the login screen
            window.location.href = "/login";
          }
        }
      }
    };
    fetchData();
  }, []); // only fire on the first render of this component

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      const { name, email, password, userName, img } = userData;
      const reqBody = { name, email, password, userName, img };
      const auth = {
        headers: {
          Authorization: jwt,
        },
      };
      const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users`;
      const response = await axios.put(url, reqBody, auth);

      setEdit(false);
    } catch (err) {
      console.log(err);
    }
    props.setCurrentUser(userData);
  };

  const handleDelete = async () => {
    try {
      const auth = {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      };
      const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users`;
      const response = await axios.delete(url, auth);
      window.location.href = "/login";
      localStorage.removeItem("jwt");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {edit ? (
        <form onSubmit={handleEdit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder={props.currentUser.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            value={userData.name}
          />
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="userName"
              placeholder={props.currentUser.userName}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
              value={userData.userName}
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder={props.currentUser.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              value={userData.email}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              placeholder="new password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              value={userData.password}
              autoComplete="off"
            />
          </div>
          <div>
            <div>
              <div>
                <img
                  src={props.currentUser?.img ? props.currentUser.img : logo}
                  alt="This is the current default profile pic which is a person with no face"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              </div>
              <label htmlFor="my_file">Your profile picture:</label>{" "}
              <Widget
                publicKey="eb5cb5bbf1cbfe6b01be"
                id="img"
                onFileSelect={handleFileSelect}
                name="my_file"
                role="uploadcare-uploader"
              />
            </div>
          </div>
          <button>Submit</button>
        </form>
      ) : (
        <div className="container text-left">
          <div className="row grid gap-5">
          <div className="col-2">
            <img
              src={props.currentUser?.img ? props.currentUser.img : logo}
              alt="This is the current default profile pic which is a person with no face"
              style={{ maxWidth: "200px", height: "auto" }}
            />
          </div>
            <div className="col-3 m-5 align-items-left">
              <h1>{props.currentUser?.name}</h1>
          <p>{props.currentUser?.email}</p>
          <button type="button" className="btn" onClick={() => setEdit(true)}>
            <i className="bi bi-pencil-square">Edit</i>
          </button>
          <button type="button" className="btn" onClick={handleDelete}>
          <i className="bi bi-person-x-fill">Delete</i>
          </button>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
