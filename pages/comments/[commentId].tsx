import { Box } from "@mui/material";
import { GetStaticPaths, GetStaticProps } from "next";
import { comments } from "../../data/comments";

function Comment({ comment }: any) {
  return (
    <Box>
      {comment.id}. {comment.text}
    </Box>
  );
}

export default Comment;

export const getStaticProps: GetStaticProps = async (context: any) => {
  const { params } = context;
  const { commentId } = params;

  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  console.log(comment);

  /** Don't do this 
  const response = await fetch(`http:localhost:3000/api/comments/${commentId}`)
  const data = await response.json()
  */

  return {
    props: {
      comment,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { commentId: "1" } },
      { params: { commentId: "2" } },
      { params: { commentId: "3" } },
    ],
    fallback: false,
  };
};
