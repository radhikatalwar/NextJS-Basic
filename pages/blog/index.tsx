import { Box, Container, Typography } from "@mui/material";
import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

type CustomAppProps = NextPage & {
  auth?: { role?: String; unauthorized?: String; loading?: NextPage };
};

const Blog: CustomAppProps = ({ posts }: any) => {
  return (
    <Container>
      <Image src={"/images/closeIconn.png"} width={"100px"} height={"100px"} />
      <Typography variant="h1">List of Posts</Typography>
      {posts.map((post: any) => (
        <Link href={`blog/${post.id}`} passHref key={post.id}>
          <Box key={post.id}>
            <Typography>
              {post.id} - {post.title}
            </Typography>
          </Box>
        </Link>
      ))}
    </Container>
  );
};

// This function gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  // Call an external API endpoint to get posts
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  if (!res.ok) {
    // If there is a server error, you might want to
    // throw an error instead of returning so that the cache is not updated
    // until the next successful request.
    throw new Error(`Failed to fetch posts, received status ${res.status}`);
  }

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
};

Blog.auth = {
  role: "admin",
  // loading: <AdminLoadingSkeleton />,
  unauthorized: "/403", // redirect to this url
};

export default Blog;
