const router = require("express").Router();
const passport = require("passport");

// Route for successful login
router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      error: false,
      message: "Successfully Logged In",
      user: req.user,
      cookies: req.cookies,
      jwtToken: req.jwtToken,
    });
  } else {
    res.status(403).json({ error: true, message: "Not Authorized" });
  }
});

// Route for failed login
router.get("/login/failed", (req, res) => {
  res.status(401).json({
    error: true,
    message: "Login failed",
  });
});

// Route for initiating Google authentication
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Callback route after Google authentication
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL, // Redirect on successful login
    failureRedirect: "/login/failed", // Redirect on failed login
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

// Route for logging out
router.get("/logout", (req, res) => {
  req.logout(); // Logout the user
  res.redirect(process.env.CLIENT_URL); // Redirect to the client URL
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Callback route after Github authentication
router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: process.env.CLIENT_URL, // Redirect on successful login
    failureRedirect: "/login/failed", // Redirect on failed login
  }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);
module.exports = router;
