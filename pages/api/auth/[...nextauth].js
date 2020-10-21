import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

let githubProfile;

const options = {
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    // ...add more providers here
  ],
  callbacks: {
    signIn: async (user, account, profile) => {
      githubProfile = profile;
    },
    session: async (session, user, sessionToken) => {
      if (!session.profile) {
        session.profile = githubProfile
      }
      return Promise.resolve(session)
    }
  }

  // A database is optional, but required to persist accounts in a database
  // database: process.env.DATABASE_URL,
}

export default (req, res) => NextAuth(req, res, options)
