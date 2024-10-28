import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const email = localStorage.getItem("userEmail"); // Get email from local storage

    try {
      const response = await axios.post("http://localhost:8000/api/verify-otp", {
        email,
        otp,
      });

      if (response.data.success) {
        // Redirect to the dashboard on successful verification
        navigate("/dashboard");
      } else {
        setError(response.data.message || "OTP verification failed.");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during OTP verification.");
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Verify OTP</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter OTP"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default VerifyOtp;
