const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

function initialize(passport, getUserByEmail, getUserById){
    async function authenticateUser(email, password, done){
        global.user = getUserByEmail(email);
        if(user == null){
            return done(null, false, {message: "Nie ma użytkownika o takim email-u."});
        }
        try{
            if(await bcrypt.compare(password, user.password)){
                return done(null, user);
            }
            else{
                return done(null, false, {message: "Błędne hasło."});
            }
        } catch (error){
            return done(error);
        }
    }
    passport.use(new localStrategy({ usernameField: "email"}, authenticateUser));
    passport.serializeUser((user, done) => done(null, user.id));
    passport.deserializeUser((id, done) => {return done(null, getUserById(id))});
}

module.exports = initialize;