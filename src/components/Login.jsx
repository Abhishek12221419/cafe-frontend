import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {useState} from "react"
function Login() {
    const [user,setUser] = useState({});
    const [error,setError] = useState("");
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const handleSubmit = async () => {
        try{
            const url = `${API_URL}/api/users/login`;
            const result = await axios.post(url,user);
            setError("welcome")
            navigate("/");
        } catch (err){
            console.log(err);
            setError("Something went wrong");
        }
    }
  return (
    <div>
      <h2>Login Form</h2>
      {error && <p>{error}</p>}
      <p>
        <input type="text" onChange={(e)=>setUser({...user,email: e.target.value})} placeholder="Email address"/>
      </p>
      <p>
        <input type="password" onChange={(e)=>setUser({...user,password: e.target.value})} placeholder="password"/>
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <hr />
      <Link to="/register">Create Account</Link>
    </div>
  );
}

export default Login