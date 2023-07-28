import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import ContenedorSesiones from "../class/sessionsClass.js";
import { isValidPassword } from "./handlePass.js";

const manejadorSesiones = new ContenedorSesiones();

passport.use(
  "login",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password) => {
      try {
        const user = await manejadorSesiones.findUser(email);

        if (!user) return(null, false);

        if (!isValidPassword(user, password)) return(null, false);

        return (null, user);
      } catch (err) {
        console.log(err);
        return (err);
      }
    }
  )
);

passport.use(
  "singup",
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, name, adress, age, phone) => {
      try {
        const user = await manejadorSesiones.createUser({
          email,
          password,
          name,
          adress,
          age,
          phone,
        });
        console.log(user);
        if (user.err) return (null, false);

        return (null, user);
      } catch (err) {
        console.log(err);
        return (err);
      }
    }
  )
);

// Serialize
passport.serializeUser((email) => {
  (null, email);
});

// Deserialize
passport.deserializeUser((email) => {
  (null, email);
});

export default passport;
