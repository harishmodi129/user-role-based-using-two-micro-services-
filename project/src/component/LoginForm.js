import React, { useState } from "react";
import axios from "axios";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(`${process.env.REACT_APP_AUTH_SERVICE_URL}/auth/login`);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_AUTH_SERVICE_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      onLogin({ token: response.data.token, role: response.data.role });
    } catch (error) {
      alert("Login Failed .Please check your credentails");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
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
          <button type="submit">Login</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
