import React, { useEffect, useState } from "react";
import axios from "axios";
import socket from "../Socket";

function Dashboard({ phone }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [message, setMessage] = useState("");

  const fetchJobs = async () => {
    const res = await axios.get("http://your-backend.onrender.com/jobs");
    setJobs(res.data);
  };

  const fetchApplications = async () => {
    const res = await axios.get(
      `http://your-backend.onrender.com/applications/${phone}`
    );
    setApplications(res.data);
  };

  const fetchNotifications = async () => {
    const res = await axios.get(
      `http://your-backend.onrender.com/notifications/${phone}`
    );

    setNotifications(res.data);

    const unread = res.data.filter((n) => !n.read).length;
    setUnreadCount(unread);
  };

  // ✅ FIX 1: Add eslint disable (top useEffect)
  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ✅ FIX 2: socket effect
  useEffect(() => {
    socket.emit("registerUser", phone);

    const handleNotification = (msg) => {
      setMessage(msg);
      fetchApplications();
      fetchNotifications();
    };

    socket.on("notification", handleNotification);

    return () => socket.off("notification", handleNotification);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phone]);

  const applyJob = async (jobTitle) => {
    const res = await axios.post("http://your-backend.onrender.com/apply", {
      jobTitle,
      applicantPhone: phone,
    });

    setMessage(res.data.message);
    fetchApplications();
  };

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <h1>Candidate Dashboard</h1>

        <div
          className="notification-bell"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          🔔
          {unreadCount > 0 && (
            <span className="badge">{unreadCount}</span>
          )}
        </div>
      </div>

      {/* NOTIFICATION PANEL */}
      {showNotifications && (
        <div className="notification-panel">
          <h3>Notifications</h3>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((note, i) => (
              <div key={i} className="notification-card">
                {note.message}
              </div>
            ))
          )}
        </div>
      )}

      {/* MESSAGE */}
      {message && <p>{message}</p>}

      {/* JOBS */}
      <h1>Available Jobs</h1>

      {jobs.map((job, index) => {
        const alreadyApplied = applications.some(
          (app) => app.jobTitle === job.title
        );

        return (
          <div className="job-card" key={index}>
            <h2>{job.title}</h2>
            <p>{job.company}</p>
            <p>{job.location}</p>

            <button
              disabled={alreadyApplied}
              onClick={() => applyJob(job.title)}
            >
              {alreadyApplied ? "Already Applied" : "Apply"}
            </button>
          </div>
        );
      })}

      {/* APPLICATIONS */}
      <h1>My Applications</h1>

      {applications.length === 0 ? (
        <p>No applications yet</p>
      ) : (
        applications.map((app, i) => (
          <div className="job-card" key={i}>
            <h3>{app.jobTitle}</h3>
            <p>Status: {app.status || "Applied"}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;