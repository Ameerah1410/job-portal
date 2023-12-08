const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// Configure Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: "862658428269-u89t21fnkfa05la8t9qvi6a8ghq05i0i.apps.googleusercontent.com",
      clientSecret: "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",
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
