import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes, useNavigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import ApplicationForm from "./components/ApplicationForm";
import StudentDashboard from "./components/StudentDashboard";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const UserData = JSON.parse(localStorage.getItem("User"));
  const [isLoggedIn, setIsLoggedIn] = useState(UserData);
  const isAdmin = UserData && UserData.cnic;
  const isStudent = UserData && UserData.roll_no;

  return (
    <div>
      {isLoggedIn && <Navbar setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
        <Route
          path="/student-dashboard"
          element={
            isStudent ? (
              <StudentDashboard />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/student-dashboard/new-application"
          element={
            isStudent ? (
              <ApplicationForm />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            isAdmin ? (
              <AdminDashboard />
            ) : (
              <LoginForm setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
