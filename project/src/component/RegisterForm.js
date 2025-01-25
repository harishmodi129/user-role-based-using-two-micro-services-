import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.REACT_APP_AUTH_SERVICE_URL}/auth/register`,
        {
          email,
          password,
          role,
        }
      );

      alert("User registered successfully !Please log in");
    } catch (err) {
      alert("Registration failed.Please try again");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Role A">Role A(uploader)</option>
          <option value="Role B">Role B</option>
        </select>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
