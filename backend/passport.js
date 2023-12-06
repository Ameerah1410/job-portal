const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// Configure Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // Callback URL after successful Google authentication
      scope: ["profile", "email"], // Requested user data
    },
    function (accessToken, refreshToken, profile, callback) {
      // The user profile is passed to the callback function
      callback(null, profile);
    }
  )
);

// Serialize user information to store in the session
passport.serializeUser((user, done) => {
  done(null, user);
});

// Deserialize user information from the session
passport.deserializeUser((user, done) => {
  done(null, user);
});
