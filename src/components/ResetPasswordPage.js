// src/components/ResetPasswordPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './AuthPage.css'; // Ensure this file contains the necessary styles

const ResetPasswordPage = () => {
  const [emailForReset, setEmailForReset] = useState('');
  const [resetOtp, setResetOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [timer, setTimer] = useState(120); // OTP timer (2 minutes)

  const startTimer = () => {
    const interval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleSendOtpForReset = () => {
    if (emailForReset) {
      setIsOtpSent(true);
      alert('OTP sent to your email address');
      startTimer();
    }
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    alert('Password reset successful!');
    // Perform the reset password logic here (API call)
  };

  return (
    <div className="auth-container">
      <h2>Reset Your Password</h2>
      <div className="forgot-password-section">
        {!isOtpSent ? (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
            />
            <button type="button" onClick={handleSendOtpForReset}>
              Send OTP
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={resetOtp}
              onChange={(e) => setResetOtp(e.target.value)}
            />
            <p>{`Time left: ${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''}${timer % 60}`}</p>
            <button type="button" onClick={handleResetPassword}>
              Reset Password
            </button>
          </>
        )}
      </div>

      {/* Link to go back to the login page */}
      <Link to="/" style={{ marginTop: '20px' }}>
        Back to Login
      </Link>
    </div>
  );
};

export default ResetPasswordPage;
