import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Widget } from "@uploadcare/react-widget";
import logo from "../assets/logo.png"

import axios from "axios";

export default function Profile(props) {
  // state for the secret message (aka user privilaged data)
  const [edit, setEdit] = useState(false)
  const [userData, setUserData] = useState({
      name: props.name,
      email: props.email,
      password: props.password,
      userName: props.userName,
      img: props.img,
})
  const jwt = localStorage.getItem("jwt");
  
  const navigate = useNavigate();

  async function handleFileSelect(file) {
    try {
      const fileInfo = await file.promise();
      const cdnUrl = fileInfo.cdnUrl;
      setUserData({ ...userData, img: cdnUrl }, () => {
      });
      // Make a POST request to update the currentUser object with the UUID of the uploaded image
    } catch (err) {
      console.log(err);
    }
  }
  

  // useEffect for getting the user data and checking auth
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the token from local storage
        const token = localStorage.getItem("jwt");
        // const userStorage = JSON.parse(localStorage.getItem('userData'))
        // make the auth headers
        const options = {
          headers: {
            Authorization: token,
          },
        };
        // hit the auth locked endpoint
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api-v1/users/auth-locked`,
          options
        );
        // example POST with auth headers (options are always last argument)
        // await axios.post(url, requestBody (form data), options)
        // set the secret user message in state
        props.setMsg(response.data.msg);
      } catch (err) {
        // if the error is a 401 -- that means that auth failed
        console.warn(err);
        if (err.response) {
          if (err.response.status === 401) {
            // panic!
            props.handleLogout();
            // send the user to the login screen
            navigate("/login");
          }
        }
      }
    };
    fetchData();
  }, []); // only fire on the first render of this component

  const handleEdit = async (e) => {
    try{
      e.preventDefault()
      const name= userData.name
      const email= userData.email
      const password= userData.password
      const userName= userData.userName
      const img= userData.img
      const reqBody = {
        name,
        userName,
        email,
        password,
        img,
      };
      const auth= {
        headers: {
          Authorization: jwt
        }
      }
      const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users`
      const response = await axios.put(url, reqBody, auth)
      setEdit(false)

    }catch(err){
      console.log(err)
    }
    props.setCurrentUser(userData)
  
    
  }

const handleDelete = async () => {
  try {
    const auth= {
      headers: {
        Authorization: jwt
      }
    }
    const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users`
    const response = await axios.delete(url, auth)
    navigate('/login')
    console.log(response)

  }catch(err){
    console.log(err)
  }
}

  return (
    <div>
      
      {edit ? (
        
       <form onSubmit={handleEdit}>
        <label htmlFor="name">Name</label>
        <input 
        type="text"
        id="name"
        placeholder={props.currentUser.name}
        onChange={(e) => setUserData({...userData, name:e.target.value})}
        value={userData.name}
        />
        <div>
        <label htmlFor="username">Username</label>
        <input 
        type="text"
        id="userName"
        placeholder={props.currentUser.userName}
        onChange={(e) => setUserData({...userData, userName:e.target.value})}
        value={userData.userName}
        />
        </div>
        <div>
        <label htmlFor="email">Email</label>
        <input 
        type="text"
        id="email"
        placeholder={props.currentUser.email}
        onChange={(e) => setUserData({...userData, email:e.target.value})}
        value={userData.email}
        />
        </div>
        <div>
        <label htmlFor="password">Password</label>
        <input 
        type="text"
        id="password"
        placeholder= 'new password'
        onChange={(e) => setUserData({...userData, password:e.target.value})}
        value={userData.password}
        />
        </div>
        <div>
      <p>
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
      </p>
        </div>
            <button>Submit</button>
      </form> 
      ) : (
        <div>
      <h1>Hello, {props.currentUser?.name}</h1>
      <div className="centered">
        <img
          src={props.currentUser?.img ? props.currentUser.img : logo}
          alt="This is the current default profile pic which is a person with no face"
          style={{ maxWidth: "200px", height: "auto" }}
        />
      </div>
      <p>your email is {props.currentUser?.email}</p>
      <button onClick={()=> setEdit(true)}>edit</button>
      <button onClick={handleDelete}>delete</button>

      <h2>
        Here is the secret message that is only availible to users of User App:
      </h2>

      <h3>{props.msg}</h3>
      </div>
      )}
    </div>
  );
}
