import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const StatusUpdate = ({ onClose, application }) => {
  const modelRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(application.status);
  const [comment, setComment] = useState(application.comment);
  const UserData = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!status) {
      toast.error("Please Select Application Status");
      return;
    }
    try {
      const res = await axios.patch(
        `http://localhost:3000/applications/${application.id}`,
        {
          status,
          comment,
        }
      );
      toast.success(res.data.message);
      handleClose();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };

  return (
    <div
      ref={modelRef}
      className="fixed inset-0 z-20 flex items-center justify-center bg-slate-400 bg-opacity-50 backdrop-blur-sm transition-all
    "
    >
      <div
        className={`flex  max-w-2xl w-full flex-col items-center justify-center rounded-md bg-white ${
          isVisible ? "modal-enter-active" : "modal-exit-active"
        }`}
      >
        <div className=" w-full border rounded-md  pb-7 flex justify-center items-center flex-col">
          <div className="bg-purple-500 rounded-t-md w-full text-white flex justify-center items-center px-5 flex-col py-2">
            <h2 className="text-2xl font-bold text-white">
              Student Clearance Form
            </h2>
            <p className="text-sm text-slate-100 pt-2">
              Update the application status to finalize the clearance process.
            </p>
          </div>
          <form className="mt-6 w-[80%] mx-auto" onSubmit={handleSubmit}>
            {/* Name & Roll NO */}
            <div className="flex justify-center items-center gap-5 ">
              <div className="space-y-1 w-[50%]">
                <label className="text-sm text-slate-600">Name</label>
                <input type="text" value={application.name} disabled />
              </div>
              <div className=" space-y-1 w-[50%]">
                <label className="text-sm text-slate-600">Roll No</label>
                <input type="text" value={application.roll_no} disabled />
              </div>
            </div>

            {/* Semester & Dep */}
            <div className="flex justify-center items-center gap-5">
              <div className="mt-3 space-y-1 w-[50%]">
                <label className="text-sm text-slate-600">Semester</label>
                <input type="text" value={application.semester} disabled />
              </div>
              {/* Department */}
              <div className="mt-3 space-y-1 w-[50%]">
                <label className="text-sm text-slate-600">Department</label>
                <input type="text" value={application.dept} disabled />
              </div>
            </div>

            {/* PURPOSE & STATUS */}
            <div className="flex justify-center items-center gap-5">
              <div className="mt-3 space-y-1 w-[50%]">
                <label className="text-sm text-slate-600">Purpose</label>
                <input type="text" value={application.purpose} disabled />
              </div>
              <div className="w-[50%] mt-3 space-y-1">
                <label className="text-sm text-slate-600">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full outline-none focus:ring-2 ring-purple-500 bg-slate-50 py-2 px-4 border rounded"
                >
                  <option value="ُPending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* COMMENT */}
            <div className="mt-3 space-y-1">
              <label className="text-sm text-slate-600">Comment</label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full h-16 focus:ring-2 focus:ring-purple-500 outline-none py-1 px-5 text-xs bg-slate-50 border rounded"
              ></textarea>
            </div>

            {/* ACTION BUTTONS */}
            <div className="flex justify-center items-center gap-5 mt-7">
              <button
                type="button"
                onClick={handleClose}
                className="w-full border border-purple-500  text-purple-500 rounded   py-[7px] font-semibold hover:bg-purple-50 transition-colors duration-500"
              >
                CANCEL
              </button>
              <button
                type="submit"
                className="w-full bg-purple-500 text-white rounded  py-2 font-semibold hover:bg-purple-600 transition-colors duration-500"
              >
                UPDATE
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default StatusUpdate;
