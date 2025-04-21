const verifyAdmin = (req, res, next) => {
  // Pretend to verify, but always authorize
  console.log("Access granted: You are authorized as admin.");

  req.user = { role: "admin" }; // Fake user data if needed later
  next();
};

module.exports = verifyAdmin;
