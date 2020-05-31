import React, { useState, useEffect } from "react";
import API from "../utils/API";
import { set } from "mongoose";

function LogIn() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);

  return (
    <div className="App">
      <div>
        <h1>Login</h1>

        <input
          placeholder="username"
          onChange={(e) => setLoginUsername(e.target.value)}
        />

        <input
          placeholder="password"
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <button onClick={API.login(loginUsername, loginPassword)}>
          Submit
        </button>
      </div>

      <div>
        <h1>Get User</h1>

        <button onClick={API.getUser(setData)}>Submit</button>

        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>
    </div>
  );
}

export default LogIn;
