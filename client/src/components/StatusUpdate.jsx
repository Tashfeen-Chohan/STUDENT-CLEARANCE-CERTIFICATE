import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StatusUpdate = ({ onClose, application }) => {
  const modelRef = useRef();
  const [isVisible, setIsVisible] = useState(false);
  const [status, setStatus] = useState(application.app_status);
  const [comment, setComment] = useState(application.comment);

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
        `http://localhost:3000/applications/${application.app_id}`,
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
      className="fixed inset-0 z-20 flex items-center justify-center bg-slate-400 bg-opacity-50 backdrop-blur-sm transition-all"
    >
      <div
        className={`flex overflow-y-auto  max-w-3xl w-full flex-col flex-grow items-center justify-center rounded-md bg-white ${
          isVisible ? "modal-enter-active" : "modal-exit-active"
        }`}
        // style={{maxHeight: "95vh", overflowY: "auto"}}
      >
        <div className=" w-full border rounded-md  pb-7 flex justify-center items-center flex-col">
          <div className="bg-purple-500 w-full text-white flex justify-center items-center px-5 flex-col py-2">
            <h2 className="text-2xl font-bold text-white">
              Student Clearance Form
            </h2>
            <p className="text-sm text-slate-100 pt-2">
              Update the application status to finalize the clearance process.
            </p>
          </div>
          <form className="mt-6 w-[90%] mx-auto" onSubmit={handleSubmit}>
            {/* Name & Roll NO & SEMESTER */}
            <div className="flex justify-center items-center gap-3 ">
              <div className="space-y-1 w-1/3">
                <label className="text-sm text-slate-600">Name</label>
                <input type="text" value={application.std_name} disabled />
              </div>
              <div className=" space-y-1 w-1/3">
                <label className="text-sm text-slate-600">Roll No</label>
                <input type="text" value={application.roll_no} disabled />
              </div>
              <div className="space-y-1 w-1/3">
                <label className="text-sm text-slate-600">Semester</label>
                <input type="text" value={application.semester} disabled />
              </div>
            </div>

            {/* Dep & ADDRESS & CARD */}
            <div className="flex justify-center items-center gap-3 mt-3">
              {/* Department */}
              <div className="space-y-1 w-1/3">
                <label className="text-sm text-slate-600">Department</label>
                <input type="text" value={application.dept} disabled />
              </div>

              {/* MAILING ADDRESS */}
              <div className="space-y-1 w-1/3">
                <label className="text-sm text-slate-600">
                  Mailing Address
                </label>
                <input
                  type="text"
                  value={application.mailing_address}
                  disabled
                />
              </div>

              {/* Student Card */}
              <div className="space-y-1 w-1/3">
                <label className="text-sm text-slate-600">Student Card</label>
                <input
                  type="text"
                  value={application.uni_card_possesion}
                  disabled
                />
              </div>
            </div>

            {/* Library and Hostel & Reason */}
            <div className="flex justify-center items-center gap-3 mt-3">
              {/* LIBRARY */}
              <div className="space-y-1 w-1/3">
                <label className="text-sm text-slate-600">Library</label>
                <input
                  type="text"
                  value={application.lib_name || "N/A"}
                  disabled
                />
              </div>
              {/* Hostel */}
              <div className="space-y-1 w-1/3">
                <label className="text-sm text-slate-600">Hostel</label>
                <input
                  type="text"
                  value={application.hostel_name || "N/A"}
                  disabled
                />
              </div>
              <div className="space-y-1 w-1/3">
                <label className="text-sm text-slate-600">
                  Reason For Application
                </label>
                <input type="text" value={application.reason} disabled />
              </div>
            </div>

            {/* STATUS & Comment */}
            <div className="flex justify-center items-start gap-3 mt-3">
              <div className="w-1/2 space-y-1">
                <label className="text-sm text-slate-600">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full outline-none focus:ring-2 ring-purple-500 bg-slate-50 py-2 px-2.5 border rounded"
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Incomplete">Incomplete</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              {/* COMMENT */}

              <div className=" space-y-1 w-1/2">
                <label className="text-sm text-slate-600">Comment</label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full h-10.5 focus:ring-2 focus:ring-purple-500 outline-none py-1 px-2 text-xs bg-slate-50 border rounded"
                ></textarea>
              </div>
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
