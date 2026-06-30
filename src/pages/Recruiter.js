import React, { useState, useEffect } from "react";
import axios from "axios";

function Recruiter() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/all-applications"
      );
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const sendNotification = async () => {
    try {
      const res = await axios.post("http://localhost:5000/notify", {
        phone,
        message,
      });

      alert(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const postJob = async () => {
    try {
      const res = await axios.post("http://localhost:5000/jobs", {
        title,
        company,
        location,
        salary,
      });

      alert(res.data.message);

      setTitle("");
      setCompany("");
      setLocation("");
      setSalary("");
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (phone, jobTitle, status) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/update-status",
        {
          phone,
          jobTitle,
          status,
        }
      );

      alert(res.data.message);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Recruiter Panel</h1>

      <h2>Post New Job</h2>

      <input
        type="text"
        placeholder="Job Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <input
        type="text"
        placeholder="Salary"
        value={salary}
        onChange={(e) => setSalary(e.target.value)}
      />

      <button onClick={postJob}>Post Job</button>

      <hr />

      <h2>Send Notification</h2>

      <input
        type="text"
        placeholder="Candidate Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <input
        type="text"
        placeholder="Notification Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button onClick={sendNotification}>
        Send Notification
      </button>

      <hr />

      <h2>All Applicants</h2>

      {applications.length === 0 ? (
        <p>No applicants yet</p>
      ) : (
        applications.map((app, index) => (
          <div className="job-card" key={index}>
            <h3>{app.jobTitle}</h3>
            <p>Phone: {app.applicantPhone}</p>
            <p>Status: {app.status}</p>

            <button
              onClick={() =>
                updateStatus(
                  app.applicantPhone,
                  app.jobTitle,
                  "Accepted"
                )
              }
            >
              Accept
            </button>

            <button
              onClick={() =>
                updateStatus(
                  app.applicantPhone,
                  app.jobTitle,
                  "Rejected"
                )
              }
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Recruiter;