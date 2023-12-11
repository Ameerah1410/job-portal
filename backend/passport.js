const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const passport = require("passport");
const mongoose = require("mongoose");
const User = require("./models/userModel");

// Configure Google OAuth 2.0 strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/callback", // Callback URL after successful Google authentication
      scope: ["profile", "email"], // Requested user data
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Check if a user with the Google ID already exists
        let user = await User.findOne({ googleId: profile.id });

        // If user does not exist, create a new one
        if (!user) {
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: 0,
            password: "google",
          });

          await user.save();
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback", // Callback URL after successful Google authentication
      scope: ["profile", "email"], // Requested user data
    },
    async (accessToken, refreshToken, profile, cb) => {
      try {
        // Check if a user with the Google ID already exists
        let user = await User.findOne({ googleId: profile.id });

        // If user does not exist, create a new one
        if (!user) {
          user = new User({
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            googleId: profile.id,
            role: 0,
            password: "github",
          });

          await user.save();
        }

        return cb(null, user);
      } catch (err) {
        return cb(err, null);
      }
    }
  )
);
