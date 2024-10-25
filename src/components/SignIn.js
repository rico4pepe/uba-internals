import React,  { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import axios from "axios";
function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
        device_info: "45gg",
      });

      if (response.data.success === true) {
        localStorage.setItem("token", response.data.user.token);
        localStorage.setItem("userData", JSON.stringify(response.data.user));
        setIsLoggedIn(true); // Set login status
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />; // Redirect to dashboard if logged in
  }

  


    return (
      <div className="container-fluid vh-100 d-flex">
        {/* Left Section */}
        <div className="row w-100">
          <div className="col-md-6 bg-light d-flex align-items-center justify-content-center">
            <img
              src="/login-bcg.png"
              alt="Illustration"
              className="img-fluid"
              style={{ maxWidth: "80%", height: "auto" }}
            />
          </div>
  
          {/* Right Section */}
          <div className="col-md-6 d-flex align-items-center justify-content-center">
  
               {/* Sign-up link */}
               <div
              className="position-absolute"
              style={{ top: "20px", right: "20px" }}
            >
              <a href="/signup" className="text-decoration-none">
                Don't have an account? <span className="text-warning">Sign up</span>
              </a>
            </div>
  
            <div className="w-75">
              <h2 className="text-center mb-4">Sign in</h2>
  
              {/* Google and Apple Sign-in Buttons */}
              <button className="btn btn-outline-dark w-100 mb-3">
                <i className="fab fa-google"></i> Sign in with Google
              </button>
              <button className="btn btn-outline-dark w-100 mb-3">
                <i className="fab fa-apple"></i> Sign in with Apple ID
              </button>
  
              <p className="text-center mt-3">Or continue with email address</p>


               {/* Error message */}
               {error && <div className="alert alert-danger">{error}</div>}
  
              {/* Sign-in Form */}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    require
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
  
                <div className="mb-3">A
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
  
                <button type="submit" className="btn btn-primary w-100">
                  Start trading
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default SignIn;
  
  