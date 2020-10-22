import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

let githubProfile;
let oAuthToken;

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
    signIn: async (user, account, profile) => {
      githubProfile = profile;
      console.log(oAuthToken);
    },
    session: async (session, sessionToken) => {
      if (!session.profile) {
        session.profile = githubProfile;
      }
      session.token = sessionToken;
      return Promise.resolve(session);
    },
    jwt: async (token, user, account, profile, isNewUser) => {
      const isSignIn = !!(user);
      if (isSignIn) {
        token.profile = profile;
        token.account = account;
      }
      console.log(token);
      return Promise.resolve(token);
    },
  },
  session: {
    jwt: true,
  },

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
};

export default (req, res) => NextAuth(req, res, options);
