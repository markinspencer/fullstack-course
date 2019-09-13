"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
var keys_1 = __importDefault(require("../config/keys"));
var User_1 = require("../models/User");
exports.configurePassport = function () {
    var GoogleStrategy = passport_google_oauth20_1.default.Strategy;
    passport_1.default.serializeUser(function (user, done) {
        done(undefined, user.id);
    });
    passport_1.default.deserializeUser(function (id, done) {
        User_1.User.findById(id).then(function (user) {
            done(undefined, user);
        });
    });
    passport_1.default.use(new GoogleStrategy({
        clientID: keys_1.default.googleClientID || '',
        clientSecret: keys_1.default.googleClientSecret || '',
        callbackURL: '/auth/google/callback'
    }, function (accessToken, refreshToken, profile, done) {
        User_1.User.findOne({ googleId: profile.id }).then(function (user) {
            if (user) {
                done(undefined, user);
            }
            else {
                new User_1.User({ googleId: profile.id })
                    .save()
                    .then(function (user) { return done(undefined, user); });
            }
        });
    }));
};
