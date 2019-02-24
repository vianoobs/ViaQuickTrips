const passport = require('passport');
const mongoose = require('mongoose');
const keys = require('../config/config');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
//access the users collection the db
const User = mongoose.model('users');
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
        done(null, user);
    })
        .catch(message => console.log(message));
});
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ userId: profile.id })
        .then(user => {
        if (user) {
            done(null, user);
        }
        else {
            new User({
                userId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                provider: profile.provider
            }).save()
                .then(newUser => done(null, newUser))
                .catch(error => {
                console.log(error);
            });
        }
    })
        .catch(error => console.log(error));
}));
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientToken,
    clientSecret: keys.facebookSecret,
    callbackURL: "http://localhost:8081/auth/facebook/callback"
}, (accessToken, refreshToken, profile, done) => {
    console.log(profile);
    User.findOne({ userId: profile.id })
        .then(user => {
        if (user) {
            console.log(profile);
            done(null, user);
        }
        else {
            new User({
                userId: profile.id,
                firstName: profile.name.givenName,
                lastName: profile.name.familyName,
                displayName: profile.displayName,
                provider: profile.provider
            }).save()
                .then(newUser => done(null, newUser))
                .catch(error => {
                console.log(error);
            });
        }
    });
}));
//# sourceMappingURL=passport.js.map