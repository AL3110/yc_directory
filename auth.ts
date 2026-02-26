import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { writeClient } from "./sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn ({ user: { name, email, image}, profile: { id, login, bio } }) { // nested named destructuring
      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id });

      if (!existingUser) {
        await writeClient.create({
          _type: 'author',
          id, // shorthand property with destructured values
          name,
          username: login,
          email,
          image,
          bio: bio || '',
        })
      }

      return true; // continue the signin process
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, { id: profile?.id });
      
        token.id = user._id;
      }

      return token;
    },
    async session ({ session, token }) {
      Object.assign(session, { id: token.id});
      return session;
    }
  }
})