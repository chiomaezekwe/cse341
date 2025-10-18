// routes/auth.js
const express = require('express');
const passport = require('passport');
const router = express.Router();

// GitHub login
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub callback
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/api/auth/failure' }),
  (req, res) => {
    res.send(`🎉 Logged in as ${req.user.name}`);
  }
);

// Auth failure
router.get('/failure', (req, res) => {
  res.status(401).send('Login failed');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).send('Logout error');
    res.send('Logged out');
  });
});

module.exports = router;
