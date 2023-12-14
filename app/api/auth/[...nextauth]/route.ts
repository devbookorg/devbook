import { addUser } from '@/firebase/users';
import NextAuth, { DefaultUser } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user }: { user: DefaultUser }) {
      if (user.id && user.name) {
        const customUser = {
          userId: user.id,
          name: user.name,
        };
        addUser(customUser);
      }
      return true;
    },
    async session({ session, token }) {
      const user = {
        id: token.sub,
        name: session.user.name,
      };
      session.user = user;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
