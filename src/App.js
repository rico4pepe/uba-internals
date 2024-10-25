//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route,  Routes,  Navigate   } from 'react-router-dom';
import SignIn from './components/SignIn';
import Dashboard from './components/Dashboard';
import BatchSMS from './components/BatchSMS'; // Import the BatchSMS component


function App() {
  return (
    <Router>
    <Routes>
      {/* Sign-in page */}
      <Route path="/" element={<Dashboard />} />
   
<Route path="/batch-sms" element={<BatchSMS />} />

      
    </Routes>
  </Router>
  );
};


export default App;
