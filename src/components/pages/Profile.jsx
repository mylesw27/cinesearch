import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Widget } from "@uploadcare/react-widget";
import logo from "../assets/logo.png";
import "./Profile.css"

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
    <div className="background row grid gap-5">
      {edit ? (
        <div className="container-fluid vh-100  text-left d-flex flex-row" >
          <div className="">
            <div className="col">
              
                <div className="img">
                <img
                  src={props.currentUser?.img ? props.currentUser.img : logo}
                  alt="This is the current default profile pic which is a person with no face"
                  style={{ maxWidth: "200px", height: "auto", border:'5px solid grey', margin: '57px 15px 8px 9px', borderRadius: '10px'}}
                />
                </div>
              <label className="mainText" style={{margin: '0px,4px,7px,61px'}}htmlFor="my_file">Update Image</label>{" "}
              <Widget
                publicKey="eb5cb5bbf1cbfe6b01be"
                id="img"
                onFileSelect={handleFileSelect}
                name="my_file"
                role="uploadcare-uploader"
              />
              
            </div>
          </div>
          <div className="col form">
        <form style={{margin: '81px 27px 10px -37px'}}onSubmit={handleEdit}>
          <div className="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Name</span>
          <input
            type="text"
            class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
            id="name"
            placeholder={props.currentUser.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            value={userData.name}
          />
          </div>
          <div className="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">User Name</span>
            <input
              type="text"
              id="userName"
              class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
              placeholder={props.currentUser.userName}
              onChange={(e) =>
                setUserData({ ...userData, userName: e.target.value })
              }
              value={userData.userName}
            />
          </div>
          <div className="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Email</span>
            <input
              type="text"
              id="email"
              class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
              placeholder={props.currentUser.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              value={userData.email}
            />
          </div>
          <div className="input-group input-group-sm mb-3">
          <span class="input-group-text" id="inputGroup-sizing-sm">Password</span>
            <input
              type="text"
              id="password"
              class="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-sm"
              placeholder="new password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              value={userData.password}
              autoComplete="off"
            />
          </div>
          
          <button type="button" className="btn">
          <i className="bi bi-arrow-repeat text-white">Submit</i>
            </button>
          <button type="button" className="btn" onClick={()=> {
            navigate('/profile');
            window.location.reload();
        }}>
          <i className="bi bi-x cancel-button">Cancel</i>
            </button>
        </form>
        </div>
        </div>
      ) : (
        <div className="container-fluid vh-100  text-left d-flex flex-row">
          <div className="row">
            <div className="col">
          <div className="img">
            <img
              src={props.currentUser?.img ? props.currentUser.img : logo}
              alt="This is the current default profile pic which is a person with no face"
              style={{ maxWidth: "200px", height: "auto", border:'5px solid grey', margin: '57px 15px 8px 9px', borderRadius: '10px'}}
            />
          </div>
          </div>
            <div className="col" style={{margin: '100px 0px 0px 0px'}}>
          <h1 className="textInfo">{props.currentUser?.name}</h1>
          <p className="textInfo">{props.currentUser?.email}</p>
          <div style={{margin: '0px 0px 0px -11px'}}>
          <button type="button" className="btn" onClick={() => setEdit(true)}>
            <i className="bi bi-pencil-square text-white">Edit</i>
          </button>
          <button type="button" className="btn" onClick={handleDelete}>
          <i className="bi bi-person-x-fill cancel-button">Delete</i>
          </button>
          </div>
          </div>
        </div>
        </div>
      )}
    </div>
  );
}
