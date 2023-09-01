import passport from 'passport';
import LocalStrategy from 'passport-local';
import userModel from '../models/user.dbmodel.js';
import { isValidPassword } from '../utils.js'


const verifyLogin = async (userName, password, done) => {
    try {
        const user = await userModel.findOne({ email: userName });
        if (user === null) return done(null, false);
        if (isValidPassword(user.pass, password)) return done(null, user);
        return done(null, false);
    } catch(err) {
      return done(err.message);
    }
};

passport.use('login', new LocalStrategy({ usernameField: 'email', passwordField: 'pass' }, verifyLogin));

passport.serializeUser((user, done) => done(null, user.id) );

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id);
    done(null, user);
  } catch (err) {
    done(err.message);
  }
});

export default passport;