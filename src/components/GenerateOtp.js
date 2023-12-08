import React, { useState } from 'react';
import axios from 'axios';

const GenerateOtp = ({ setOtpUri }) => {
  const getOtpUri = async () => {
    try {
      const response = await axios.get('http://localhost:3001/otp-uri');
      setOtpUri(response.data.otp);
    } catch (error) {
      console.error('Error fetching OTP URI', error);
    }
  };

  return (
    <div>
      <h2>OTP Generator</h2>
      <button onClick={getOtpUri}>Generate OTP</button>
    </div>
  );
};

export default GenerateOtp;