const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./config'); // Assuming you have a User model defined

async function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await User.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'No User Found' });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (isPasswordMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password Incorrect' });
            }
        } catch (error) {
            return done(error);
        }
    };

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    });
}

module.exports = initialize;
