const { Router } = require("express");

// Router
const adminRouter = Router();
const { adminModel } = require("../db");

// auth
const adminAuth = async (req, res) => {
  const { username, password } = req.body;

  const admin = await adminModel.findOne({
    username: username,
    password: password,
  });

  if (admin) {
    res.json({
      message: "Your are Login Succesfully....",
    });
  } else {
    res.status(403).json({
      message: " Invalid Creds",
    });
  }
};

adminRouter.post("/gbu", adminAuth);

module.exports = {
  adminRouter,
};
