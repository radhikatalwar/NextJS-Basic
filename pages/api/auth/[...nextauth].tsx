import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ApiError } from "next/dist/server/api-utils";

export const authOptions: NextAuthOptions = {
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "my-project",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch(
          "https://milliedevapi.appskeeper.in/api/admin/login",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const user = await res.json();
        console.log("res", user, res);
        if (user.statusCode === 400) {
          throw new Error(
            JSON.stringify({ error: user.message, status: false })
          );

          // throw new ApiError(user.message);
          // return null;
        }
        // If no error and we have user data, return it
        if (user.statusCode === 200 && user) {
          return user;
        }
        console.log("hELLO", user, "HELLO");

        // Return null if user data could not be retrieved
        return null;
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log("jwt", user, token, account);
      if (account && user) {
        return {
          ...token,
          accessToken: user?.data?.token,
          role: "admin",
          // refreshToken: user.refreshToken,
        };
      }
      return token;
    },

    async session({ session, token }) {
      console.log("hyy", token);

      session.user.accessToken = token.accessToken;
      session.user.role = token.role;

      console.log("session", session);
      return session;
    },
  },
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", // Hex color code #33FF5D
    logo: "/logo.png", // Absolute URL to image
  },
  // Enable debug messages in the console if you are having problems
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
