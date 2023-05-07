import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

export default function Profile(props) {
  // state for the secret message (aka user privilaged data)
  const [edit, setEdit] = useState(false)
  const [userData, setUserData] = useState({
      name: props.name,
      email: props.email,
      password: props.password
})
  const jwt = localStorage.getItem("jwt");
  
  const navigate = useNavigate();

  // useEffect for getting the user data and checking auth
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get the token from local storage
        const token = localStorage.getItem("jwt");
        const userStorage = JSON.parse(localStorage.getItem('userData'))
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
  }, [props.handleLogout, navigate]); // only fire on the first render of this component

 const  handleEdit = async (e) => {
    try{
      e.preventDefault()
      const name= userData.name
      const email= userData.email
      const password= userData.password
      const reqBody = {
        name,
        email,
        password,
      };
      const auth= {
        headers: {
          Authorization: jwt
        }
      }
      const url = `${process.env.REACT_APP_SERVER_URL}/api-v1/users/user`
      const response = await axios.put(url, reqBody, auth)
      setUserData({...userData,
        name: response.data.name,
        email: response.data.email,
        password: response.data.password
    })
      setEdit(false)
      localStorage.setItem('userData', JSON.stringify(userData))
      console.log("response right here", response)
    }catch(err){
      console.log(err)
    }
    
    
    props.setCurrentUser(userData)
    console.log(props.currentUser)
    navigate('/profile')
    
  }

  return (
    <div>
      
      {edit ? (
        
       <form onSubmit={handleEdit}>
        <label htmlFor="name">Name</label>
        <input 
        type="text"
        id="name"
        placeholder={props.name}
        onChange={(e) => setUserData({...userData, name:e.target.value})}
        value={userData.name}
        />
        <label htmlFor="email">Email</label>
        <input 
        type="text"
        id="email"
        placeholder={props.email}
        onChange={(e) => setUserData({...userData, email:e.target.value})}
        value={userData.email}
        />
        <label htmlFor="password">Password</label>
        <input 
        type="text"
        id="password"
        placeholder= 'new password'
        onChange={(e) => setUserData({...userData, password:e.target.value})}
        value={userData.password}
        />

        <button>Submit</button>

      </form> 
      ) : (
        <div>
      <h1>Hello, {userData.name}</h1>
      <p>your email is {userData.email}</p>
      <button onClick={()=> setEdit(true)}>edit</button>
      <button>delete</button>

      <h2>
        Here is the secret message that is only availible to users of User App:
      </h2>

      <h3>{props.msg}</h3>
      </div>
      )}
    </div>
  );
}
