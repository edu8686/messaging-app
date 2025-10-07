const { Router} = require("express")
const authRouter = Router();
const authController = require("../controllers/authController");
const passport = require("passport");

authRouter.post("/login", passport.authenticate("local", { session : false }), authController.login);


module.exports = authRouter
