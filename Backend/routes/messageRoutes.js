const { Router } = require("express");
const messageRouter = Router()
const messageController = require("../controllers/messageController")
const passport = require("passport")

const multer = require("multer");

const upload = multer({ dest: "uploads/" });


messageRouter.post("/new_message", (req,res,next) => { console.log(" Pasó por la ruta /new_message"); next(); }, passport.authenticate("jwt", {session : false}), upload.single("file"), messageController.createMessage)


module.exports = messageRouter