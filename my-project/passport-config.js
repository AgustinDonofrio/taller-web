const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('./models/User');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        return done(null, user);
      }
      // Si no se encuentra el usuario, guardar los datos en la sesión
      const userProfile = {
        email: profile.emails[0].value,
        username: profile.name.givenName + profile.name.familyName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        isOAuth: true
      };
      return done(null, user);
    } catch (err) {
      return done(err, false, err.message);
    }
  }
));

passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['id', 'emails', 'name']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ email: profile.emails[0].value });
      if (user) {
        return done(null, user);
      }
      // Si no se encuentra el usuario, guardar los datos en la sesión
      const userProfile = {
        email: profile.emails[0].value,
        username: profile.name.givenName + profile.name.familyName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        isOAuth: true
      };
      return done(null, user);
    } catch (err) {
      return done(err, false, err.message);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id || user);
});

passport.deserializeUser(async (id, done) => {
  try {
    if (typeof id === 'string') {
      const user = await User.findById(id);
      return done(null, user);
    }
    return done(null, id);
  } catch (err) {
    return done(err, null);
  }
});

module.exports = passport;