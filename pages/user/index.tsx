import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { GetServerSideProps, NextPage } from "next";

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
export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  // Call an external API endpoint to get posts
  const result = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await result.json();

  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  // By returning { props: { posts } }, the User component
  // will receive `posts` as a prop at build time
  return {
    props: {
      users,
    },
  };
};

export default User;
