const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;
const userRouter = require("./routes/userRoutes");
const auhtRouter = require("./routes/authRoutes");
const chatRouter = require("./routes/chatRoutes");
const messageRouter = require("./routes/messageRoutes")
const path = require("path");
const profileRouter = require("./routes/profileRoutes");

if(process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

app.use(cors({
    origin: [
      "http://localhost:5174"
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use("/user", userRouter);
app.use("/", auhtRouter);
app.use("/chats", chatRouter);
app.use("/message", messageRouter);
app.use("/profile", profileRouter)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

