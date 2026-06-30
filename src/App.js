import React, { useState } from "react";
import CandidateLogin from "./pages/CandidateLogin";
import RecruiterLogin from "./pages/RecruiterLogin";
import Dashboard from "./pages/Dashboard";
import Recruiter from "./pages/Recruiter";
import "./App.css";   // ← IMPORTANT

function App() {
  const [page, setPage] = useState("home");
  const [candidatePhone, setCandidatePhone] = useState("");

  if (page === "home") {
    return (
      <div className="login-container">
        <h1>Job Portal</h1>

        <button onClick={() => setPage("candidateLogin")}>
          Candidate Login
        </button>

        <button onClick={() => setPage("recruiterLogin")}>
          Recruiter Login
        </button>
      </div>
    );
  }

  if (page === "candidateLogin") {
    return (
      <CandidateLogin
        setCandidatePhone={setCandidatePhone}
        setPage={setPage}
      />
    );
  }

  if (page === "recruiterLogin") {
    return <RecruiterLogin setPage={setPage} />;
  }

  if (page === "dashboard") {
    return <Dashboard phone={candidatePhone} />;
  }

  if (page === "recruiter") {
    return <Recruiter />;
  }

  return null;
}

export default App;