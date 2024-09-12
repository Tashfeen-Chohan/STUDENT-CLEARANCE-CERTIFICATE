import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const [purpose, setPurpose] = useState("");
  const UserData = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!purpose) {
      toast.error("Please Select Application Purpose");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/applications/new", {
        student_id: UserData.id,
        purpose,
      });
      toast.success(res.data.message);
      setPurpose("");
      navigate("/student-dashboard");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };
  return (
    <div className="flex justify-center items-center my-10">
      <div className="max-w-2xl w-full border border-purple-100 rounded-md shadow-md shadow-purple-200 pb-7 flex justify-center items-center flex-col">
        <div className="bg-purple-500 rounded-t-md w-full text-white flex justify-center items-center flex-col py-2">
          <h2 className="text-2xl font-bold text-white">Application Form</h2>
          <p className="text-sm text-slate-100 pt-2">
            Submit Your Clearance Form to Complete the Process
          </p>
        </div>
        <form className="mt-6 w-[80%] mx-auto" onSubmit={handleSubmit}>
          {/* Name & Roll NO */}
          <div className="flex justify-center items-center gap-5">
            <div className="space-y-1">
              <label className="text-sm text-slate-600">Name</label>
              <input type="text" value={UserData.name} disabled />
            </div>
            <div className=" space-y-1">
              <label className="text-sm text-slate-600">Roll No</label>
              <input type="text" value={UserData.roll_no} disabled />
            </div>
          </div>

          {/* Semester & Dep */}
          <div className="flex justify-center items-center gap-5">
            
            <div className="mt-3 space-y-1">
              <label className="text-sm text-slate-600">Semester</label>
              <input type="text" value={UserData.semester} disabled />
            </div>
            {/* Department */}
            <div className="mt-3 space-y-1">
              <label className="text-sm text-slate-600">Department</label>
              <input type="text" value={UserData.dept} disabled />
            </div>
          </div>

          {/* PURPOSE */}
          <div className="mt-3 flex justify-center items-start flex-col gap-1">
            <label className="text-sm text-slate-600">
              Application Purpose
            </label>
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full outline-none focus:ring-2 ring-purple-500 bg-slate-50 py-2 px-4 border rounded"
            >
              <option value="" disabled>
                -- Select Application Purpose --
              </option>
              <option value="Academic Clearance">Academic Clearance</option>
              <option value="Financial Clearance">Financial Clearance</option>
              <option value="Internship Completion">
                Internship Completion
              </option>
              <option value="FYP Clearance">FYP Clearance</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-7 w-full bg-purple-500 text-white rounded  py-2 font-semibold hover:bg-purple-600 transition-colors duration-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
