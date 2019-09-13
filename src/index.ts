import cookieSession from 'cookie-session';
import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';

import { authRoutes } from './routes/authRoutes';
import { configurePassport } from './services/passport';
import keys from './config/keys';

mongoose.connect(keys.mongoURI || '');

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey || '']
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Setup
configurePassport();

// Routes
authRoutes(app);

// Start
const PORT = process.env.PORT || 4200;
app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));

//prod
export default {
  googleClientID: '',
  googleClientSecret: '',
  mongoURI: ''
};
