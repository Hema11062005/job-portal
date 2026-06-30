import React, { useState } from "react";

function Login({ setIsLoggedIn, setPhone }) {
  const [phone, setLocalPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = () => {
    if (phone.length !== 10) {
      alert("Enter valid 10-digit phone number");
      return;
    }

    setOtpSent(true);
    alert("Dummy OTP Sent: 123456");
  };

  const verifyOTP = () => {
    if (otp === "123456") {
      alert("OTP Verified");
      setPhone(phone);
      setIsLoggedIn(true);
    } else {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="login-container">
      <h2>Job Portal Login</h2>

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setLocalPhone(e.target.value)}
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

export default Login;