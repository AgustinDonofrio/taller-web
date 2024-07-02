const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

// Ruta para Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', {
  failureRedirect: '/login'
}), (req, res) => {
  req.session.oauthUser = req.user;
  res.redirect('/register');
});

// Ruta para Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', passport.authenticate('facebook', {failureRedirect: '/login'}), 
  (req, res) => {
    req.session.oauthUser = req.user;
  res.redirect('/register');
});



router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`/registerUser?email=${req.user.email}&firstName=${req.user.firstName}&lastName=${req.user.lastName}&username=${req.user.username}`);
  });

/*
// Ruta para iniciar sesión como usuario
router.post('/login/user', authController.loginUser);

// Ruta para iniciar sesión como comercio
router.post('/login/commerce', authController.loginCommerce);*/

module.exports = router;