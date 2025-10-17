const { Router} = require("express")
const authRouter = Router();
const authController = require("../controllers/authController");
const passport = require("passport");

authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      console.error("Passport error:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    if (!user) {
      return res.status(401).json({
        error: "Usuario o contraseña incorrectos",
      });
    }

    // Asignar el usuario al request para que authController.login lo use
    req.user = user;

    // Llamar al controlador de login (el tuyo)
    return authController.login(req, res);
  })(req, res, next);
});



module.exports = authRouter
