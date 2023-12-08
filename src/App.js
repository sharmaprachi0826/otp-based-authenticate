import React, { useState } from 'react';
import OtpGenerator from './components/GenerateOtp';
import OtpVerifier from './components/VerifyOtp';
import './App.css'; 
function App() {
  const [otpUri, setOtpUri] = useState('');
  
  return (
    <div className='container'>
      <h1>OTP Authentication Demo</h1>
      <OtpGenerator setOtpUri={setOtpUri}/>
      {otpUri && <label>{otpUri}</label>}
      <OtpVerifier/>
    </div>
  );
}

export default App;