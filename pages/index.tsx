import { Box, Button, Container, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { signOut, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

type CustomAppProps = NextPage & {
  auth?: { role?: String; unauthorized?: String; loading?: NextPage };
};

const Home: CustomAppProps = (): JSX.Element => {
  const { data, status } = useSession();

  console.log(data, status);
  return (
    <Container className={styles.container}>
      <Head>
        <title>My App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box className={styles.main}>
        <Typography className={styles.title}>
          Welcome to The Project ,
        </Typography>
        <Typography style={{ wordBreak: "break-all" }}>
          {"Access token : "}
          {data?.user?.accessToken}
        </Typography>
        <Link href="/blog">
          <Button>STATIC RENDERING</Button>
        </Link>
        <Link href="/user">
          <Button>SERVER SIDE RENDERING</Button>
        </Link>
        <Button onClick={() => signOut()}>LOG OUT</Button>
      </Box>
    </Container>
  );
};

// This is the recommended way for Next.js 9.3 or newer
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);
  console.log("session,", session, session?.user?.accessToken);
  return {
    props: {
      session,
    },
  };
};

Home.auth = {
  role: "admin",
  // loading: <AdminLoadingSkeleton />,
  unauthorized: "/login", // redirect to this url
};

export default Home;
