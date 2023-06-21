import passport from "passport";
import LocalStrategy from "passport-local";
import GithubStrategy from "passport-github2";
import userModel from "../api/users/users.model.js";

const initializePassport = () => {
  const verifyAuthRegistration = async (userName, password, done) => {
    try {
      const user = await userModel.findOne({ userName: userName });

      if (user === null) {
        // El mail no está registrado, todo ok para seguir
        return done(null, { _id: 0 });
      } else {
        return done(null, false, {
          message: "El email ya se encuentra registrado",
        });
      }
    } catch (err) {
      return done(err.message);
    }
  };

  passport.use(
    "authRegistration",
    new LocalStrategy(
      { usernameField: "userName", passwordField: "password" },
      verifyAuthRegistration
    )
  );

  const githubData = {
    clientID: "Iv1.7888f7676bf6feb7",
    clientSecret: "a02baf9580da7b75546aea15d535dcc4fa7c700a",
    callbackUrl: "http://localhost:3000/api/sessions/githubcallback",
  };

  const verifyAuthGithub = async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await userModel.findOne({
        userName: profile._json.email,
      });

      console.log(user);
      if (!user) {
        done(null, false);
      } else {
        done(null, user);
      }
    } catch (err) {
      return done(err.message);
    }
  };

  passport.use("github", new GithubStrategy(githubData, verifyAuthGithub));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);
      done(null, user);
    } catch (err) {
      done(err.message);
    }
  });
};

export default initializePassport;
