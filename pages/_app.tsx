import "../styles/globals.css";
import Layout from "../components/layout/index";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../utils/theme";
import { SessionProvider, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { NextComponentType } from "next";

//Add custom appProp type then use union to add it
type CustomAppProps = AppProps & {
  Component: NextComponentType & {
    auth?: {
      role?: String;
      unauthorized?: URL;
    };
  }; // add auth type
  pageProps: any;
};

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: CustomAppProps) {
  const router = useRouter();
  console.log("pageProps", pageProps);
  useEffect(() => {
    if (Component?.auth?.role && Component?.auth?.role !== "admin")
      router.push(Component?.auth?.unauthorized ?? "/");
  }, [Component]);
  console.log("Component in App.js", Component.auth);
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Krona+One&display=optional"
          rel="stylesheet"
        />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider
        session={pageProps.session}
        refetchInterval={5 * 60} // Re-fetch session every 5 minutes
        refetchOnWindowFocus={true} // Re-fetches session when window is focused
      >
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <Layout>
            {Component?.auth ? (
              <Auth>
                <Component {...pageProps} />
              </Auth>
            ) : (
              <Component {...pageProps} />
            )}
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}

function Auth({ children }: any) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isUser = !!session?.user;
  console.log("User in App.js", isUser);
  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!isUser || session?.user?.role === "error") router.push("/login"); //Redirect to login
  }, [isUser, status]);

  if (isUser) {
    return children;
  }
  // Session is being fetched, or no user.
  // If no user, useEffect() will redirect.
  return <div>Loading...</div>;
}
