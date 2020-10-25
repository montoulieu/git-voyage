import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    session: async (session, sessionToken) => {
      session.token = sessionToken;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile) => {
      const isSignIn = !!(user);
      if (isSignIn) {
        token.profile = profile;
        token.account = account;
      }
      return Promise.resolve(token);
    },
  },
  pages: {
    signIn: '/',
  },
  session: {
    jwt: true,
  },

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
