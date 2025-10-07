const { Router } = require("express");
const chatRouter = Router()
const chatController = require("../controllers/chatController");
const passport = require("passport");


chatRouter.get("/:userId/all", passport.authenticate("jwt", {session : false}), chatController.findChats)
chatRouter.get("/:userId/with/:receiverId", passport.authenticate("jwt", {session : false}), chatController.findChat);
chatRouter.get("/user/:userId/chat/:chatId", passport.authenticate("jwt", {session : false}),  chatController.findGroupChat)
chatRouter.post("/", passport.authenticate("jwt", {session : false}), chatController.createChat);
chatRouter.post("/new-group", passport.authenticate("jwt", {session : false}), chatController.createGroupChat)
chatRouter.delete("/:chatId", passport.authenticate("jwt", {session : false}), chatController.deleteChat)

module.exports = chatRouter