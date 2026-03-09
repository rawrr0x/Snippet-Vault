import { Response } from 'express';
import { COOKIE_MAX_AGE } from '../constants';

export const setEmailToCookies = (res: Response, userEmail: string) => {
  res.cookie('user_email', userEmail, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
  });
};
