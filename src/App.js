
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Make sure this import is there
import AuthPage from './components/AuthPage';
import ResetPasswordPage from './components/ResetPasswordPage';

//import './App.css';  

function App() {
  return (
    <Router>
      <Routes>
        {/* Define route for login page */}
        <Route path="/" element={<AuthPage />} />
        
        {/* Define route for reset password page */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
