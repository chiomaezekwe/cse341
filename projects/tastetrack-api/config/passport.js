// config/passport.js
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/userModel'); // Create this next

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => done(null, user)).catch(done);
});

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ githubId: profile.id });

    if (!user) {
      user = await User.create({
        githubId: profile.id,
        name: profile.displayName || profile.username,
        email: profile.emails?.[0]?.value || 'N/A',
        avatar: profile.photos?.[0]?.value || '',
      });
    }

    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
