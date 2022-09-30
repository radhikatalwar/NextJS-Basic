import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
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
        const { email, password } = credentials;
        console.log("I am here");

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

        console.log("hELLO", user, "HELLO");

        return user;
        // if (
        //   email !== "radhika.talwar@appinventiv.com" &&
        //   password !== "superadmin"
        // ) {
        //   throw new Error("invalid credientials");
        // } else {
        //   return {
        //     email: "radhika.talwar@appinventiv.com",
        //     name: "Radhika Talwar",
        //     password: "superadmin",
        //     token: "djksdjkdjskfnsf",
        //   };
        // }

        // Return null if user data could not be retrieved
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
            // refreshToken: user.refreshToken,
          };
        }
      return token;
    },

    async session({ session, token }) {
      console.log("hyy", token);

      session.user.accessToken = token.accessToken;
      // session.user.refreshToken = token.refreshToken;
      // session.user.accessTokenExpires = token.accessTokenExpires;

      console.log("sessoin", session);
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
