const { Router } = require("express");
const userRouter = Router()
const userController = require("../controllers/userController")
const passport = require("passport")

userRouter.post("/signup", userController.createUser);
userRouter.get("/:query", passport.authenticate("jwt", {session : false}), userController.findUsers);


module.exports = userRouter