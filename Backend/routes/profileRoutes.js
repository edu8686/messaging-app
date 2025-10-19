const { Router } = require("express");
const profileRouter = Router()
const profileController = require("../controllers/profileController")
const passport = require("passport")

profileRouter.get("/:user_id", passport.authenticate("jwt", {session : false}), profileController.findProfile)
profileRouter.post("/new", passport.authenticate("jwt", {session : false}), profileController.createProfile)
profileRouter.post("/:profile_id/hobby", passport.authenticate("jwt", {session : false}), profileController.createHobby)
profileRouter.delete("/:profile_id/hobby", passport.authenticate("jwt", {session : false}), profileController.deleteHobby)
profileRouter.put("/:profile_id/location", passport.authenticate("jwt", { session: false }), profileController.updateCity);


module.exports = profileRouter