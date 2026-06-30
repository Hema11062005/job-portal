import React, { useState } from "react";

function CandidateLogin({ setCandidatePhone, setPage }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = () => {
    if (phone.length !== 10) {
      alert("Enter valid phone");
      return;
    }
    setOtpSent(true);
    alert("Dummy OTP: 123456");
  };

  const verifyOTP = () => {
    if (otp === "123456") {
      setCandidatePhone(phone);
      setPage("dashboard");
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-container">
      <h1>Candidate Login</h1>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={sendOTP}>Send OTP</button>

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default CandidateLogin;