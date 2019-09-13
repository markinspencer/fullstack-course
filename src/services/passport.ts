import passport from 'passport';
import GoogleOAuth, { Profile, VerifyCallback } from 'passport-google-oauth20';
import keys from '../config/keys';
import { User } from '../models/User';

export const configurePassport = () => {
  const GoogleStrategy = GoogleOAuth.Strategy;

  passport.serializeUser((user: User, done: VerifyCallback) => {
    done(undefined, user.id);
  });

  passport.deserializeUser((id: string, done: VerifyCallback) => {
    User.findById(id).then((user: User | null) => {
      done(undefined, user);
    });
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID || '',
        clientSecret: keys.googleClientSecret || '',
        callbackURL: '/auth/google/callback'
      },
      (
        accessToken: string,
        refreshToken: string,
        profile: Profile,
        done: VerifyCallback
      ) => {
        User.findOne({ googleId: profile.id }).then((user: User | null) => {
          if (user) {
            done(undefined, user);
          } else {
            new User({ googleId: profile.id })
              .save()
              .then((user: User) => done(undefined, user));
          }
        });
      }
    )
  );
};
