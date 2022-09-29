import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const BlogDetails: NextPage = ({ post }: any) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Container>
      <Typography variant="h1">Post Details</Typography>
      <Box key={post.id}>
        <Typography>
          {post.id} - {post.title}
        </Typography>
        <Typography>{post.body}</Typography>
      </Box>
    </Container>
  );
};

// This function gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  // Call an external API endpoint to get posts
  const { params } = context;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params?.blogId}`
  );
  const post = await res.json();

  // By returning { props: { posts } }, the BlogDetails component
  // will receive `posts` as a prop at build time
  return {
    props: {
      post,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  const paths = posts.map((post: any) => ({
    params: { blogId: post.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

// fallback can  be true or 'blocking' or false
// false  ->  shows 404 page if not value static page found related to it
// true -> Not show 404 page rather show the router.isfalback component then show the page
// blocking -> Same as true just don't show loading stay on previous page until the new page is getting created.
export default BlogDetails;
