import { addUser } from '@/firebase/users';
import NextAuth, { DefaultUser } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user }: { user: DefaultUser }) {
      if (user.name && user.email) {
        const customUser = {
          name: user.name,
          email: user.email,
        };
        addUser(customUser);
      }
      return true;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
