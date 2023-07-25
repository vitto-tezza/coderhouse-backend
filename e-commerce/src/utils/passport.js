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
    async (req, email, password, done) => {
      try {
        const user = await manejadorSesiones.findUser(email);

        if (!user) return done(null, false);

        if (!isValidPassword(user, password)) return done(null, false);

        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
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
    async (req, email, password, done) => {
      try {
        const { personName, adress, age, phone, avatar } = req.body;

        const user = await manejadorSesiones.createUser({
          email,
          password,
          personName,
          adress,
          age,
          phone,
          avatar,
        });

        if (user.err) return done(null, false);

        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

// Serialize
passport.serializeUser((email, done) => {
  done(null, email);
});

// Deserialize
passport.deserializeUser((email, done) => {
  done(null, email);
});

export default passport;
