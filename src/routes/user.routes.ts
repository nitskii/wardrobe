import cookie from '@elysiajs/cookie';
import jwt from '@elysiajs/jwt';
import { Elysia, t } from 'elysia';
import userService from '../services/user.service';

const userRoutes = (app: Elysia) => app
  .use(
    jwt({
      secret: process.env.SECRET
    })
  )
  .use(cookie({
    maxAge: process.env.COOKIE_MAX_AGE,
    sameSite: true
  }))
  .model({
    user: t.Object({
      nickname: t.String({
        minLength: 3,
        maxLength: 30,
      }),
      password: t.String({
        minLength: 8,
        maxLength: 50
      })
    })
  })
  .post(
    '/signup',
    async ({ body: userData, jwt, setCookie, set }) => {
      const newUserId = await userService.signup(userData);
      const token = await jwt.sign({ sub: newUserId });

      setCookie('auth', token);

      set.status = 204;
      set.headers['HX-Redirect'] = '/user/items';
            
      return;
    },
    { body: 'user' }
  )
  .onError(({ error, set }) => {
    if (error.message === 'User exists') {
      set.status = 409;
    }

    return {
      error: error.message
    };
  });

export default userRoutes;