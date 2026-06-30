import React, { useState } from "react";

function RecruiterLogin({ setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (email === "admin@gmail.com" && password === "admin123") {
      setPage("recruiter");
    } else {
      alert("Invalid recruiter credentials");
    }
  };

  return (
    <div>
      <h2>Recruiter Login</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default RecruiterLogin;