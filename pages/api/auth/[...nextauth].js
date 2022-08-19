import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import {cloneDeep} from "tailwindcss/lib/util/cloneDeep";

export default NextAuth({
    providers:[
        TwitterProvider({
            clientId: process.env.TWITTER_CONSUMER_KEY,
            clientSecret:process.env.TWITTER_CONSUMER_SECRET
        })
    ],
    callbacks: {
      async jwt({token, user, account, profile, isNewUser}) {
          if (profile) {
              token['userProfile'] = {
                  followersCount: profile.followers_count,
                  twitterHandle: profile.screen_name,
                  userID: profile.id
              };
          }
          if (account) {
              token['credentials'] = {
                  authToken: account.oauth_token,
                  authSecret: account.oauth_token_secret,
              }
          }
          return token
      },
      async session({session, token, user}) {
          // Send properties to the client, like an access_token from a provider.
          let userData = cloneDeep(token.userProfile);
          session.twitter = userData;
          return session;
      }
  },
    secret: process.env.SECRET,
})