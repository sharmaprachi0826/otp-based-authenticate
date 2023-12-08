import React, { useState } from 'react';
import axios from 'axios';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');

  const verifyOtp = async () => {
    try {
      const response = await axios.post('http://localhost:3001/verify-otp', { token: otp, userId: userId, role: ['user']});
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error verifying OTP', error);
    }
  };


  return (
    <div>
      <h2>OTP Verifier</h2>
      <div>
        <label>Enter OTP:</label>
        <input type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
        <label>Enter User Id:</label>
        <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button onClick={verifyOtp}>Verify OTP</button>
      </div>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
