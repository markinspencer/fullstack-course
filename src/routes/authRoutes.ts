import passport from 'passport';
import { Express, Request, Response } from 'express';

export const authRoutes = (app: Express): void => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req: Request, res: Response) => {
    req.logout();
    res.send(req.user);
  });

  app.get('/api/current_user', ({ user }: Request, res: Response) => {
    res.send(user);
  });
};
