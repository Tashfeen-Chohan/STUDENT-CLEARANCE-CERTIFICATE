import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  const [purpose, setPurpose] = useState("");

  const [isHostelResident, setIsHostelResident] = useState(""); // Tracks if student is in a hostel
  const [hostelName, setHostelName] = useState(""); // Tracks the selected hostel name

  const UserData = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    //Form Validation
    if (!purpose) {
      toast.error("Please Select Application Purpose");
      return;
    }

    if (isHostelResident === "yes" && !hostelName) {
      toast.error("Please select a hostel if you reside in one.");
      return;
    }
    try {
      const res = await axios.post("http://localhost:3000/applications/new", {
        student_id: UserData.id,
        purpose,

        isHostelResident: isHostelResident === "yes",
        hostelName: isHostelResident === "yes" ? hostelName : null,
      });
      toast.success(res.data.message);
      setPurpose("");

      setIsHostelResident(""); // Reset hostel state
      setHostelName(""); // Reset hostel name
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


            {/* Hostel Residency */}
            <div className="mt-3 flex justify-center items-start flex-col gap-1">
            <label className="text-sm text-slate-600">Do you reside in a hostel?</label>
            <div className="flex gap-5">
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={isHostelResident === "yes"}
                  onChange={(e) => setIsHostelResident(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={isHostelResident === "no"}
                  onChange={(e) => setIsHostelResident(e.target.value)}
                />
                No
              </label>
            </div>
          </div>

          {/* Hostel Dropdown (Conditionally Rendered) */}
          {isHostelResident === "yes" && (
            <div className="mt-3 flex justify-center items-start flex-col gap-1">
              <label className="text-sm text-slate-600">Select Your Hostel</label>
              <select
                value={hostelName}
                onChange={(e) => setHostelName(e.target.value)}
                className="w-full outline-none focus:ring-2 ring-purple-500 bg-slate-50 py-2 px-4 border rounded"
              >
                <option value="" disabled>
                  -- Select Hostel --
                </option>
                <option value="Ashfaq Ahmed Hostel, GCU KSK Campus">
                  Ashfaq Ahmed Hostel, GCU KSK Campus
                </option>
                <option value="Fatima Jinnah Girls Hostel">Fatima Jinnah Girls Hostel</option>
                <option value="Dr. Ruth Pfau New Girls Hostel">Dr. Ruth Pfau New Girls Hostel</option>
                <option value="Iqbal Hostel">Iqbal Hostel</option>
                <option value="Quaid-e-Azam Hostel">Quaid-e-Azam Hostel</option>
              </select>
            </div>
          )}

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
