// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const LoginForm = ({setIsLoggedIn}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password){
      toast.error("Please provide Username & Password")
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
      setIsLoggedIn(true)
      if (role === "Student") {
        navigate("/student-dashboard");
      } else {
        navigate("admin-dashboard");
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="max-w-lg py-10  flex justify-center items-center flex-col w-full shadow-md shadow-purple-200 border border-purple-100">
        <h2 className="text-3xl font-serif  font-bold text-purple-500">
          Welcome Back!
        </h2>
        <p className="text-slate-400 text-sm pb-10">
          Secure access to your dashboard.
        </p>
        <form className="mx-auto w-[70%]" onSubmit={handleSubmit}>
          <div>
            {/* <label>Username:</label> */}
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-5 w-full">
            {/* <label>Password:</label> */}
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="hover:bg-purple-600 font-semibold transition-colors duration-500 mt-7 bg-purple-500 text-white py-2 w-full rounded"
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
