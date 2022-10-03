import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";

const User: NextPage = ({ users }: any) => {
  return (
    <Container>
      <Typography variant="h1">List of Users</Typography>
      {users.map((user: any) => (
        <Box key={user.id}>
          <Typography>
            {user.id} - {user.name} - {user.email}
          </Typography>
        </Box>
      ))}
    </Container>
  );
};

// This function gets called at build time
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // Call an external API endpoint to get posts
  const { res } = context;
  const session = await getSession(context);
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await result.json();

  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: "/login?callbackUrl=https://localhost:3000/user",
  //       permanent: false,
  //     },
  //   };
  // }

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  // By returning { props: { posts } }, the User component
  // will receive `posts` as a prop at build time
  return {
    props: {
      session,
      users,
    },
  };
};

export default User;
