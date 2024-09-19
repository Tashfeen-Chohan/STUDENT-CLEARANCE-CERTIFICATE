import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaWpforms } from "react-icons/fa6";
import { BiSolidErrorAlt } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();
  const UserData = JSON.parse(localStorage.getItem("User"));
  console.log(applications)

  useEffect(() => {
    const fetchStudentApplications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/applications/${UserData.id}`
        );
        setApplications(res.data.stdApplications[0]);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchStudentApplications();
  }, []);

  const tableRows = applications?.map((value, index) => {
    const status = value.app_status;
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
        <td className="px-6 py-3">{index + 1}</td>
        <th
          scope="row"
          className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap"
        >
          {value.std_name}
        </th>
        <td className="px-6 py-3">{value.roll_no}</td>
        <td className="px-6 py-3">{value.semester}</td>
        <td className="px-6 py-3">{value.dept}</td>
        <td className="px-6 py-3">{value.library_status}</td>
        <td className="px-6 py-3">
          {value.lib_name || (
            <span className="bg-slate-200 py-1 px-2 text-xs rounded">NULL</span>
          )}
        </td>
        <td className="px-6 py-3">{value.hostel_status}</td>
        <td className="px-6 py-3">
          {value.hostel_name || (
            <span className="bg-slate-200 py-1 px-2 text-xs rounded">NULL</span>
          )}
        </td>
        <td className="px-6 py-3">{value.uni_card_possesion}</td>
        <td className="px-6 py-3">{value.reason}</td>
        <td className="px-6 py-3">{value.mailing_address}</td>
        <td className="px-6 py-3">
          <span className={`${statusClass} py-1 px-2.5 rounded text-xs`}>
            {status}
          </span>
        </td>
        <td className="px-6 py-3 cursor-pointer">
          {value.comment ? (
            <div class="relative group">
              <p class="truncate  w-28">{value.comment}</p>

              <span class=" absolute right-0 bottom-5 w-max hidden group-hover:block bg-slate-200 text-black p-2 px-4 rounded-full">
                {value.comment}
              </span>
            </div>
          ) : (
            <span className="bg-slate-200 py-1 px-2 text-xs rounded">NULL</span>
          )}
        </td>
      </tr>
    );
  });

  return (
    <div className=" flex justify-center items-center flex-col mt-20">
      {/* TABLE */}

      <div
        className={`${
          applications.length === 0 && "hidden"
        } w-full max-w-6xl border border-purple-300 rounded pt-5 mx-auto`}
      >
        <h2 className="text-3xl text-center font-bold  text-purple-500">
          My Applications
        </h2>
        <div class="relative overflow-x-auto shadow-md shadow-purple-100  mt-10 max-w-6xl w-full">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead class="text-xs text-slate-100 uppercase bg-purple-600 ">
              <tr>
                <th scope="col" class="px-6 py-3">
                  #
                </th>
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
                  Library Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Library Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Hostel Status
                </th>
                <th scope="col" class="px-6 py-3">
                  Hostel Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Uni Card
                </th>
                <th scope="col" class="px-6 py-3">
                  REASON
                </th>
                <th scope="col" class="px-6 py-3">
                  ADDRESS
                </th>
                <th scope="col" class="px-6 py-3">
                  STATUS
                </th>
                <th scope="col" class="px-6 py-3">
                  COMMENT
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
