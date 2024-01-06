import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '@models/user';
import { connectToDB } from '@utils/database';

// see Web client 1 to see how you set up the OAuth credentials on Google Cloud
// link: https://console.cloud.google.com/apis/credentials?project=promptopia-409723&supportedpurview=project

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      });

      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ profile }) {
      try {
        await connectToDB();

        // check if user already exisits
        const userExists = await User.findOne({
          email: profile.email
        });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture
          });
        }

        return true;
      } catch (error) {
        console.log('There was an error', error.message);
        return false;
      }
    },
  }
});

export { handler as GET, handler as POST };