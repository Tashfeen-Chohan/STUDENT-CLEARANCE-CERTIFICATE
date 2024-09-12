import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import StudentDashboard from "./pages/StudentDashboard";

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  

  return (
    <div>
      { isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn}/>} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
      </Routes>
    </div>
  );
};

export default App;
