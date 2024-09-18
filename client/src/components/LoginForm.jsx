// src/components/LoginForm.jsx



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please provide Username & Password");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      toast.success(response.data.message);
      const role = response.data.role;
      localStorage.setItem("User", JSON.stringify(response.data.userInfo));
      setIsLoggedIn(true);
      setUsername("");
      setPassword("");
      if (role === "Student") {
        navigate("/student-dashboard");
      } else {
        navigate("admin-dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-md pb-10 rounded-md flex justify-center items-center flex-col w-full shadow-md shadow-purple-200 border border-purple-100">
        <div className="bg-purple-500 rounded-t-md py-3 flex justify-center items-center flex-col w-full">
          <h2 className="text-2xl font-bold text-white">Welcome Back!</h2>
          <p className="text-slate-100 text-sm">
            Secure access to your dashboard.
          </p>
        </div>
        <form className="mx-auto mt-12 w-[85%]" onSubmit={handleSubmit}>
          <div>
            {/* <label>Username:</label> */   }
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-6 w-full relative">
            {/* <label>Password:</label> */}
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <FaRegEye
                onClick={togglePassword}
                color="gray"
                className="absolute top-3 cursor-pointer right-5"
              />
            ) : (
              password.length > 0 && (
                <FaRegEyeSlash
                  onClick={togglePassword}
                  color="gray "
                  className="absolute top-3 cursor-pointer right-5"
                />
              )
            )}
          </div>
          <button
            className="hover:bg-purple-600 font-semibold transition-colors duration-500 mt-8 bg-purple-500 text-white py-2 w-full rounded"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;




/*

// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please provide Username & Password");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      toast.success(response.data.message);
      const role = response.data.role;
      localStorage.setItem("User", JSON.stringify(response.data.userInfo));
      setIsLoggedIn(true);
      if (role === "Student") {
        navigate("/student-dashboard");
      } else {
        navigate("admin-dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <div className="card-body">
          <h2 className="card-title text-center text-primary font-weight-bold">
            Welcome Back!
          </h2>
          <p className="card-text text-center text-muted mb-4">
            Secure access to your dashboard.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mb-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              className="btn btn-primary btn-block"
              type="submit"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;*/














