import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Navbar = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const UserData = JSON.parse(localStorage.getItem("User"));
  const isAdmin = UserData.cnic;

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("User");
    navigate("/");
    toast.success("Logout Successfully");
  };

  return (
    <nav className="shadow-md bg-slate-100 shadow-purple-200  border-purple-400 py-3.5 px-20 flex justify-between items-center">
      <div className="font-bold italic text-2xl text-purple-500">DIT - GCU</div>
      {isAdmin && (
          <span className="text-xl tracking-widest">
            [ Welcome to Admin Panel ! ]
          </span>
        )}
      <div className="flex justify-center items-center gap-3">
        {!isAdmin && (
          <div className="space-x-3 mr-10 font-semibold ">
            <span
              onClick={() => navigate("/student-dashboard")}
              className="cursor-pointer"
            >
              My Applications
            </span>
            <span
              onClick={() => navigate("/student-dashboard/new-application")}
              className="cursor-pointer"
            >
              New Application
            </span>
          </div>
        )}
        
        <FaRegUserCircle size={22} />
        <h2 className="font-semibold">{UserData.name}</h2>
        <button
          onClick={handleLogout}
          className="bg-purple-500 text-white py-1 px-3 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
