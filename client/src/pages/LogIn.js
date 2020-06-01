import React, { useState } from "react";
import API from "../utils/API";

function LogIn() {
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  function login() {
    API.login(loginUsername, loginPassword);
  }
  function getUser() {
    API.getUser(setData);
  }
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

        <button onClick={login}>Submit</button>
      </div>

      <div>
        <h1>Get User</h1>

        <button onClick={getUser}>Submit</button>

        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>
    </div>
  );
}

export default LogIn;
