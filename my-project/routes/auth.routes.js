const express = require('express');
const router = express.Router();
const passport = require('passport');

// Ruta para Google OAuth
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  req.session.oauthUser = req.user;
  res.redirect('/register');
});

// Ruta para Facebook OAuth
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), 
  (req, res) => {
    req.session.oauthUser = req.user;
  res.redirect('/register');
});



router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`/registerUser?email=${req.user.email}&firstName=${req.user.firstName}&lastName=${req.user.lastName}&username=${req.user.username}`);
  });

module.exports = router;