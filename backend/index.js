const express = require('express');
const speakeasy = require('speakeasy');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Enable CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Adjust the origin as needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const users = [
  { id: '1', username: 'user1', password: 'password1', claims: ['user'] },
  { id: '2', username: 'admin', password: 'admin123', claims: ['admin', 'user'] },
];
const secret = speakeasy.generateSecret();

// Middleware for claim-based authorization
const authorizeClaims = (requiredClaims) => {
  return (req, res, next) => {

    const userId  = req.body.userId;
    const user = users.find((u) => u.id == userId);
    if (user && user.claims.some((claim) => requiredClaims.includes(claim))) {
      next();
    } else {
      res.json({ success: false, message: 'Invalid' });
    }
  };
};


//Route to generate the OTP
app.get('/otp-uri', (req, res) => {
  const otp = speakeasy.totp({ secret: secret.ascii,  encoding: 'ascii', label: 'MyApp' });
  res.json({ otp });
});


//Route to verify the OTP
app.post('/verify-otp', (req, res) => {
  const { token, role } = req.body;
  if(token == '')
  {
    res.json({ success: false, message: 'Invalid OTP' });
      return;
  }
  const verified = speakeasy.totp.verify({ secret: secret.ascii, encoding: 'ascii', token });

  if (verified) {
    // Use middleware for to verify the route for both users and matches the userid
    authorizeClaims(role)(req, res, () => {
      res.json({ success: true, message: 'OTP and claims verified successfully' });
    });
  } else {
    res.json({ success: false, message: 'OTP verification failed' });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
