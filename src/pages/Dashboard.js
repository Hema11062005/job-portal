import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import socket from "../Socket";

function Dashboard({ phone }) {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [message, setMessage] = useState("");

  const BACKEND_URL = "https://job-portal-bac.onrender.com";

  const fetchJobs = useCallback(async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/jobs`);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchApplications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/applications/${phone}`
      );
      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  }, [phone]);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${BACKEND_URL}/notifications/${phone}`
      );

      setNotifications(res.data);

      const unread = res.data.filter((n) => !n.read).length;
      setUnreadCount(unread);
    } catch (error) {
      console.log(error);
    }
  }, [phone]);

  useEffect(() => {
    fetchJobs();
    fetchApplications();
    fetchNotifications();
  }, [fetchJobs, fetchApplications, fetchNotifications]);

  useEffect(() => {
    socket.emit("registerUser", phone);

    const handleNotification = (msg) => {
      setMessage(msg);
      fetchApplications();
      fetchNotifications();
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [phone, fetchApplications, fetchNotifications]);

  const applyJob = async (jobTitle) => {
    try {
      const res = await axios.post(`${BACKEND_URL}/apply`, {
        jobTitle,
        applicantPhone: phone,
      });

      setMessage(res.data.message);
      fetchApplications();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
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

      {showNotifications && (
        <div className="notification-panel">
          <h3>Notifications</h3>

          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((note, i) => (
              <div key={i} className="notification-card">
                <p>{note.message}</p>
              </div>
            ))
          )}
        </div>
      )}

      {message && <p>{message}</p>}

      <h1>Available Jobs</h1>

      {jobs.map((job, index) => {
        const alreadyApplied = applications.some(
          (app) => app.jobTitle === job.title
        );

        return (
          <div className="job-card" key={index}>
            <h2>{job.title}</h2>
            <p>Company: {job.company}</p>
            <p>Location: {job.location}</p>
            <p>Salary: {job.salary}</p>

            <button
              disabled={alreadyApplied}
              onClick={() => applyJob(job.title)}
            >
              {alreadyApplied ? "Already Applied" : "Apply"}
            </button>
          </div>
        );
      })}

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