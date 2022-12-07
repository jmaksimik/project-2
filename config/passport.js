const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
//Require your User Model here!
const User = require('../models/user');

// configuring Passport!
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({googleId: profile.id});
      if(user) return cb(null, user);
      user = await User.create({
        userName: profile.displayName,
        googleId: profile.id,
        email: profile.emails[0].value
      })
      return cb(null, user);
    
    } catch(err){
      return cb(err)
    };
    // a user has logged in via OAuth!
    // refer to the lesson plan from earlier today in order to set this up
    }
));

passport.serializeUser(function(user, cb) {
  cb(null, user._id);
});

  // Find your User, using your model, and then call done(err, whateverYourUserIsCalled)
  // When you call this done function passport assigns the user document to req.user, which will 
  // be availible in every Single controller function, so you always know the logged in user
  passport.deserializeUser(function(userId, done) {
    User.findById(userId, function(err, userDoc){
      if(err) return cb(err);
      done(null, userDoc);
    })
});



