const LocalStrategy = require('passport-local').Strategy;
const bcrypt =require('bcrypt');
function initialize(passport,getUserByEmail,getUserByID){
    const authenticateUser = async (email,password,done) =>{
            const user =  getUserByEmail(email);
            if(!user){
                return done(null,false,{message:'No User Found'});  //Returns false if the user is not found.
            }
            try{
                if(await bcrypt.compare(password,user.password)){
                    return done(null,user);   //Returns user object if password is correct
            } else{
                return done(null,false,{message:"Password Incorrect"});   //If Password is incorrect it returns false and "Password
                }
            }
            catch(e){
                return done(e)
            }
        
    }
    passport.use(new LocalStrategy({usernameField:'email'},
    authenticateUser));
    passport.serializeUser( (user, done)=> done(null,user.id))
    passport.deserializeUser((id, done) => {
        return done (null,getUserByID(id))
    })
}
module.exports = initialize;