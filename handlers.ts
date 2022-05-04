import Chance from 'chance';
import { graphql } from 'msw';
import { v4 as uuidv4 } from 'uuid';

const signUp = graphql.mutation('signUp', (req, res, ctx) => {
  const { username, password, email } = req.variables?.data;
  switch(username){
    case "bad-username": {
      return res(
        ctx.errors([
          {
            message: 'Bad username',
            errorType: 'AuthenticationError',
          },
        ]),
      );
    }
  }

  return res(
    ctx.data({
      message: "Welcome"
    }),
  );
});

const signIn = graphql.mutation('signIn', (req, res, ctx) => {
  const { usernameOrEmail } = req.variables?.data;
  return res(
    ctx.data({
      user: {
        username: 'username',
        email: 'email'
      },
      token: 'token'
    }),
  )
});

const passwordReset = graphql.mutation('passwordReset', (req, res, ctx) => {
  const { usernameOrEmail } = req.variables?.data;
  switch(usernameOrEmail){
    case "bad-username": {
      return res(
        ctx.errors([
          {
            message: 'A user with the given name or email was not found.',
            errorType: 'AuthenticationError',
          },
        ]),
      );
    }
  }
  return res(
    ctx.data({
      message: 'A message was sent to the related email with instructions to reset your password.'
    }),
  )
});


const verifyEmail = graphql.mutation('verifyEmail', (req, res, ctx) => {
  const { username } = req.variables
  return res(
    ctx.data({
      login: {
        username,
      },
    }),
  )
});

export const handlers = [signUp, signIn, verifyEmail, passwordReset];