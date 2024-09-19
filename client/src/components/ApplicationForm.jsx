import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ApplicationForm = () => {
  //const [purpose, setPurpose] = useState("");
  const [reason,setReason] = useState("");

  const [isLibraryEnrolled, setIsLibraryEnrolled] = useState("");
  const [libraryName, setLibraryName] = useState(""); 
  const [isHostelResident, setIsHostelResident] = useState("");
  const [hostelName, setHostelName] = useState(""); 

  const [studentCardPossession, setStudentCardPossession] = useState(""); 

  const [mailingAddress, setMailingAddress] = useState("");


  const UserData = JSON.parse(localStorage.getItem("User"));
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation
    if (!purpose) {
      toast.error("Please Select Application Purpose");
      return;
    }
    if (isHostelResident === "yes" && !hostelName) {
      toast.error("Please select a hostel if you reside in one.");
      return;
    }

    if (isLibraryEnrolled === "yes" && !libraryName) {
      toast.error("Please select a library if you are enrolled in one.");
      return;
    }

    // Submitting form data
    try {
      const res = await axios.post("http://localhost:3000/applications/new", {
        student_id: UserData.id,
       
        reason,
        mailingAddress,
        StudentCardPossession,
        isHostelResident: isHostelResident === "yes",
        hostelName: isHostelResident === "yes" ? hostelName : null,
        isLibraryEnrolled: isLibraryEnrolled === "yes",
        libraryName: isLibraryEnrolled === "yes" ? libraryName : null,
      });
      toast.success(res.data.message);
      setReason("");
      setIsHostelResident(""); // Reset hostel state
      setHostelName(""); // Reset hostel name
      setIsLibraryEnrolled(""); // Reset library enrollment state
      setLibraryName(""); // Reset library name
      setStudentCardPossession("");
      setMailingAddress("");
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
          <h2 className="text-2xl font-bold text-white">University Clearance Form</h2>
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
            <div className="space-y-1">
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

        

        


          {/* REASON */}
<div className="mt-3 flex justify-center items-start flex-col gap-1">
  <label className="text-sm text-slate-600">Reason for Leaving/ Clearance</label>
  <select
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    className="w-full outline-none focus:ring-2 ring-purple-500 bg-slate-50 py-2 px-4 border rounded"
  >
    <option value="" disabled>
      -- Select Reason --
    </option>
    <option value="Migration">Migration</option>
    <option value="Degree Completion">Degree Completion</option>
    <option value="Transfer to Another University">Transfer to Another University</option>
    <option value="Financial Issues">Financial Issues</option>
    <option value="Personal Reasons">Personal Reasons</option>
    <option value="Medical Reasons">Medical Reasons</option>
    <option value="Other">Other</option>
  </select>
</div>


{/* Mailing Address */}
<div className="mt-3 flex justify-center items-start flex-col gap-1">
  <label className="text-sm text-slate-600">Mailing Address</label>
  <input
    type="text"
    value={mailingAddress}
    onChange={(e) => setMailingAddress(e.target.value)}
    placeholder="Enter your mailing address"
    className="w-full outline-none focus:ring-2 ring-purple-500 bg-slate-50 py-2 px-4 border rounded"
  />
</div>


{/* Library Enrollment and Hostel Residency */}
<div className="mt-3 flex justify-between items-start gap-10">
  {/* Library Enrollment */}
  <div className="flex flex-col gap-1 w-1/2">
    <label className="text-sm text-slate-600">Are you enrolled in a library?</label>
    <div className="flex gap-5">
      <label>
        <input
          type="radio"
          value="yes"
          checked={isLibraryEnrolled === "yes"}
          onChange={(e) => setIsLibraryEnrolled(e.target.value)}
        />
        Yes
      </label>
      <label>
        <input
          type="radio"
          value="no"
          checked={isLibraryEnrolled === "no"}
          onChange={(e) => setIsLibraryEnrolled(e.target.value)}
        />
        No
      </label>
    </div>
  </div>

  {/* Hostel Residency */}
  <div className="flex flex-col gap-1 w-1/2">
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
</div>






          {/* Library Dropdown (Conditionally Rendered) */}
          {isLibraryEnrolled === "yes" && (
            <div className="mt-3 flex justify-center items-start flex-col gap-1">
              <label className="text-sm text-slate-600">Select Your Library</label>
              <select
                value={libraryName}
                onChange={(e) => setLibraryName(e.target.value)}
                className="w-full outline-none focus:ring-2 ring-purple-500 bg-slate-50 py-2 px-4 border rounded"
              >
                <option value="" disabled>
                  -- Select Library --
                </option>
                <option value="Fazal-i-Hussain Library">Fazal-i-Hussain Library</option>
                <option value="Postgraduate Library">Postgraduate Library</option>
                <option value="Life Sciences Library">Life Sciences Library</option>
                <option value="Departmental Libraries">Departmental Libraries</option>
                <option value="Central Library">Central Library</option>
                <option value="Main Library">Main Library</option>
                <option value="Law Library">Law Library</option>
              </select>
            </div>
          )}


        

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



 {/* University Student Card Option */}
 <div className="mt-3 flex justify-center items-start flex-col gap-1">
            <label className="text-sm text-slate-600">Do you want your University Student Card?</label>
            <div className="flex gap-5">
              <label>
                <input
                  type="radio"
                  value="yes"
                  checked={studentCardPossession === "yes"}
                  onChange={(e) => setStudentCardPossession(e.target.value)}
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  value="no"
                  checked={studentCardPossession === "no"}
                  onChange={(e) => setStudentCardPossession(e.target.value)}
                />
                No
              </label>
            </div>
          </div>

          

 


          {/* Submit Button */}
          <button
            type="submit"
            className="mt-7 w-full bg-purple-500 text-white rounded py-2 font-semibold hover:bg-purple-600 transition-colors duration-500"
          >
            Submit
          </button>
        </form>
      </div>



    </div>
  );
};

export default ApplicationForm;















