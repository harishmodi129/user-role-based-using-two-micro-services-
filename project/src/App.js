import "./App.css";
import LoginForm from "./component/LoginForm";
import UploadView from "./component/uploadView";
import ApprovedView from "./component/ApprovedView";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RegisterForm from "./component/RegisterForm";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (data) => {
    setUser(data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.role);
  };

  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  return (
    <Router>
      <div>
        <h1>Role-Based Application</h1>
        {user ? <button onClick={logout}>Logout</button> : null}
        <Routes>
          <Route path="/" element={<Navigate to="/register" />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route
            path="/login"
            element={
              !user ? (
                <LoginForm onLogin={handleLogin} />
              ) : (
                <Navigate
                  to={user.role === "Role A" ? "/upload" : "/approve"}
                />
              )
            }
          />
          <Route
            path="/upload"
            element={
              user?.role === "Role A" ? <UploadView /> : <Navigate to="/" />
            }
          />
          <Route
            path="/approve"
            element={
              user?.role === "Role B" ? <ApprovedView /> : <Navigate to="/" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
