import NextAuth, { DefaultSession, User } from 'next-auth';

declare module 'next-auth' {
  export interface Session extends DefaultSession {
    user?: {
      id: string;
    } & DefaultSession['user'];
  }
}
