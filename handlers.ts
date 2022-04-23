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
  const { username } = req.variables
  return res(
    ctx.data({
      user: {
        username,
      },
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

export const handlers = [signUp, signIn, verifyEmail];