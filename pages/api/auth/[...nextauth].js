import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter"

export default NextAuth({
    providers:[
        TwitterProvider({
            clientId: process.env.TWITTER_CONSUMER_KEY,
            clientSecret:process.env.TWITTER_CONSUMER_SECRET
        })
    ],
    callbacks: {
        session({ session, token, user }) {
          return session // The return type will match the one returned in `useSession()`
        },
      },
      secret: process.env.SECRET
})