import "../styles/globals.css";
import Layout from "../components/layout/index";
import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../utils/theme";
// import createEmotionCache from "../utils/createEmotionCache";
import { SessionProvider } from "next-auth/react";

// Client-side cache, shared for the whole session of the user in the browser.
// const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props: any) {
  const { Component, pageProps } = props;

  console.log("pageProps", pageProps);
  return (
    // <CacheProvider value={emotionCache}>
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
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </SessionProvider>
    </>
    // </CacheProvider>
  );
}
