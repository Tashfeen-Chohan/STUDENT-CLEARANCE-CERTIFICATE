import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaWpforms } from "react-icons/fa6";
import { BiSolidErrorAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const UserData = JSON.parse(localStorage.getItem("User"));

  useEffect(() => {
    const fetchStudentApplications = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3000/applications/${UserData.id}`
        );
        console.log(res);
        setApplications(res.data.stdApplications);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentApplications();
  }, []);

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen -mt-20">
  //       <ScaleLoader height={50} width={5} color="#9333EA" />
  //     </div>
  //   );
  // }

  const tableRows = applications?.map((value, index) => {
    const status = value.status;
    const statusClass =
      status === "Approved"
        ? "bg-[#3AC430] text-white"
        : status === "Pending"
        ? "bg-[#FE9705] text-slate-50"
        : status === "Rejected"
        ? "bg-[#D11313] text-white"
        : status === "Incomplete"
        ? "bg-[#0569FF] text-white"
        : "text-gray-600 bg-gray-200";
    return (
      <tr key={index} className="bg-white border-b hover:bg-gray-50">
        <th
          scope="row"
          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
        >
          {value.name}
        </th>
        <td className="px-6 py-3">{value.roll_no}</td>
        <td className="px-6 py-3">{value.semester}</td>
        <td className="px-6 py-3">{value.dept}</td>
        <td className="px-6 py-3">{value.purpose}</td>
        <td className="px-6 py-3">
          <span className={`${statusClass} py-1 px-2.5 rounded text-xs`}>
            {status}
          </span>
        </td>
      </tr>
    );
  });

  return (
    <div className=" flex justify-center items-center flex-col mt-20">
      {/* TABLE */}
      {/* <div class="relative group">
          <p class="truncate  w-10">
            This is a long comment that will be truncated but will display the
            full text when hovered.
          </p>

          <span class="absolute left-0 bottom-0 w-max hidden group-hover:block bg-gray-800 text-white p-2 rounded-md">
            This is a long comment that will be truncated but will display the
            full text when hovered.
          </span>
        </div> */}
      <div
        className={`${
          applications.length === 0 && "hidden"
        } w-full max-w-5xl border border-purple-300 rounded pt-5 mx-auto`}
      >
        <h2 className="text-3xl text-center font-bold rounded-b-md text-purple-500">
          My Applications
        </h2>
        <div class="relative overflow-x-auto shadow-md shadow-purple-100  mt-10 max-w-5xl w-full">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-slate-100 uppercase bg-purple-600 ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  NAME
                </th>
                <th scope="col" class="px-6 py-3">
                  ROLL NO
                </th>
                <th scope="col" class="px-6 py-3">
                  SEMESTER
                </th>
                <th scope="col" class="px-6 py-3">
                  DEPARTMENT
                </th>
                <th scope="col" class="px-6 py-3">
                  PURPOSE
                </th>
                <th scope="col" class="px-6 py-3">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>{tableRows}</tbody>
          </table>
        </div>
      </div>
      {/* NO APPLICATION SUBMITTED */}
      <div
        className={`${
          applications.length !== 0 && "hidden"
        } flex justify-center items-center flex-col`}
      >
        <BiSolidErrorAlt size={150} className="text-purple-500" />
        <span className="font-bold">No Application Submitted!</span>
        <button
          onClick={() => navigate("/student-dashboard/new-application")}
          className="bg-purple-500 hover:bg-purple-600 transition-colors duration-500 font-semibold text-sm mt-3 text-white rounded py-2 px-4"
        >
          Submit New Application
        </button>
      </div>
    </div>
  );
};

export default StudentDashboard;
