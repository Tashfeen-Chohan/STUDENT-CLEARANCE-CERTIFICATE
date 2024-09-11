// src/components/AdministrationForm.jsx
import React, { useState } from 'react';

const AdministrationForm = () => {
  const [applications, setApplications] = useState([
    { username: 'student1', semester: '5', status: 'Pending' },
    { username: 'student2', semester: '3', status: 'Pending' }
  ]);

  const handleApproval = (index, approved) => {
    const updatedApplications = [...applications];
    updatedApplications[index].status = approved ? 'Approved' : 'Rejected';
    setApplications(updatedApplications);
  };

  return (
    <div>
      <h2>Administration Form</h2>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Semester</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={index}>
              <td>{app.username}</td>
              <td>{app.semester}</td>
              <td>{app.status}</td>
              <td>
                <button onClick={() => handleApproval(index, true)}>Approve</button>
                <button onClick={() => handleApproval(index, false)}>Reject</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdministrationForm;
