import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";

const Navbar = () => {
  const handleLogout = () => {
    toast.success("Logout Successfully");
  };
  return (
    <nav className="shadow-lg bg-slate-100 shadow-purple-200  border-purple-400 py-3.5 px-20 rounded-b-3xl flex justify-between items-center">
      <div className="font-bold italic text-2xl text-purple-500">DIT - GCU</div>
      <div className="flex justify-center items-center gap-3">
        <div className="space-x-3 mr-10 font-semibold ">
          <span className="cursor-pointer">My Applications</span>
          <span className="cursor-pointer">New Application</span>
        </div>
        <FaRegUserCircle size={22} />
        <h2>Tashfeen Chohan</h2>
        <button
          onClick={handleLogout}
          className="bg-purple-500 text-white py-0.5 px-3 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
