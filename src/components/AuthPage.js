import React, { useState, useEffect } from 'react';
import './AuthPage.css'; // Ensure this CSS file exists and is styled appropriately

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [selectedMethod, setSelectedMethod] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timer, setTimer] = useState(0);
  const [otp, setOtp] = useState('');
  const [inputErrors, setInputErrors] = useState({});
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  // Timer countdown logic
  useEffect(() => {
    let timerInterval;
    if (timer > 0) {
      timerInterval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0 && otpSent) {
      setOtpSent(false);
    }

    return () => clearInterval(timerInterval);
  }, [timer, otpSent]);

  const handleLogin = (e) => {
    e.preventDefault();
    let errors = {};

    if (selectedMethod === 'Username' && !username) {
      errors.username = true;
    }
    if (selectedMethod === 'Email' && !email) {
      errors.email = true;
    }
    if ((selectedMethod === 'Username' || selectedMethod === 'Email') && !loginPassword) {
      errors.loginPassword = true; // Flag for empty password
      alert('Password is required.');
    }
    if (selectedMethod === 'Mobile Number' && !mobile) {
      errors.mobile = true;
      if (!otp) {
        errors.otp = true;
        alert('OTP is required.');
      }
    }

    setInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert('Login successful!');
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    let errors = {};

    if (!username) errors.username = true;
    if (!email) errors.email = true;
    if (!mobile) errors.mobile = true;
    if (!password) {
      errors.password = true;
      alert('Password is required.');
    }

    setInputErrors(errors);

    if (Object.keys(errors).length === 0) {
      alert('Signup successful! You can now log in.');
      setIsSignup(false);
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    alert('Password reset instructions have been sent to your email!');
  };

  const handleSendOtp = () => {
    if (mobile) {
      setOtpSent(true);
      setTimer(30); // Set timer for 30 seconds (adjust as needed)
      alert('OTP sent to your mobile number/email.');
    } else {
      alert('Please enter your mobile number or email.');
      setInputErrors({ mobile: true });
    }
  };

  return (
    <div className="auth-container">
      <h1>{isSignup ? 'Sign Up' : isResetPassword ? 'Reset Password' : 'Login'}</h1>

      {isResetPassword ? (
        <form onSubmit={handlePasswordReset} className="form-style">
          <input
            type="text"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn-submit">Submit</button>
          <button type="button" onClick={() => setIsResetPassword(false)} className="btn-back">
            Back to Login
          </button>
        </form>
      ) : isSignup ? (
        <form onSubmit={handleSignup} className="form-style">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={inputErrors.username ? 'input-error' : ''}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputErrors.email ? 'input-error' : ''}
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className={inputErrors.mobile ? 'input-error' : ''}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={inputErrors.password ? 'input-error' : ''}
            required
          />
          <button type="submit" className="btn-submit">Sign Up</button>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="form-style">
          <div className="method-select">
            <button type="button" onClick={() => setSelectedMethod('Username')} className="method-btn">
              Username
            </button>
            <button type="button" onClick={() => setSelectedMethod('Mobile Number')} className="method-btn">
              Mobile Number
            </button>
            <button type="button" onClick={() => setSelectedMethod('Email')} className="method-btn">
              Email
            </button>
          </div>

          {selectedMethod && (
            <>
              {selectedMethod === 'Username' && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className={inputErrors.username ? 'input-error' : ''}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={inputErrors.loginPassword ? 'input-error' : ''}
                    required
                  />
                </>
              )}

              {selectedMethod === 'Email' && (
                <>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputErrors.email ? 'input-error' : ''}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className={inputErrors.loginPassword ? 'input-error' : ''}
                    required
                  />
                </>
              )}

              {selectedMethod === 'Mobile Number' && (
                <>
                  <input
                    type="text"
                    placeholder="Enter your mobile number"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className={inputErrors.mobile ? 'input-error' : ''}
                    required
                  />
                  {otpSent ? (
                    <>
                      <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className={inputErrors.otp ? 'input-error' : ''}
                        required
                      />
                      <p>OTP sent! Please wait {timer} seconds to resend.</p>
                    </>
                  ) : (
                    <button type="button" onClick={handleSendOtp} className="btn-otp">
                      Send OTP
                    </button>
                  )}
                </>
              )}

              {(selectedMethod === 'Username' || selectedMethod === 'Email') && (
                <button
                  type="button"
                  onClick={() => setIsResetPassword(true)}
                  className="forgot-password-link"
                >
                  Forgot Password?
                </button>
              )}

              {(selectedMethod === 'Username' || selectedMethod === 'Email') && (
                <button type="submit" className="btn-submit">Login</button>
              )}
              {selectedMethod === 'Mobile Number' && otpSent && (
                <button type="submit" className="btn-submit">Verify OTP</button>
              )}
            </>
          )}
        </form>
      )}

      {!isSignup && !isResetPassword && (
        <button onClick={() => setIsSignup(true)} className="toggle-btn">
          New user? Sign Up
        </button>
      )}
      {isSignup && (
        <button onClick={() => setIsSignup(false)} className="toggle-btn">
          Already have an account? Login
        </button>
      )}
    </div>
  );
};

export default AuthPage;


