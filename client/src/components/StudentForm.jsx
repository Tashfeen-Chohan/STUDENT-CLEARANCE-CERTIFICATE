// src/components/StudentForm.jsx
import React, { useState } from 'react';

const StudentForm = () => {
  const [dept, setDept] = useState('');
  const [semester, setSemester] = useState('');
  const [email, setEmail] = useState('');
  const [request, setRequest] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setStatus('Application submitted');
  };

  return (
    <div>
      <h2>Student Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dept:</label>
          <input 
            type="text" 
            value={dept} 
            onChange={(e) => setDept(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Current Semester:</label>
          <input 
            type="text" 
            value={semester} 
            onChange={(e) => setSemester(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Email:</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Request:</label>
          <select 
            value={request} 
            onChange={(e) => setRequest(e.target.value)} 
            required
          >
            <option value="">Select request</option>
            <option value="clearance_certificate">Clearance Certificate</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
      {status && <p>Status: {status}</p>}
    </div>
  );
};

export default StudentForm;
