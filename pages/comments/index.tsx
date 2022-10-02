import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
function CommentsPage() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchComments = async () => {
    const response = await fetch("/api/comments");
    const data = await response.json();
    setComments(data);
  };

  const submitComment = async () => {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  };

  const deleteComment = async (commentId: any) => {
    const response = await fetch(`/api/comments/${commentId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    fetchComments();
  };
  return (
    <>
      <Box>
        <TextField
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button onClick={submitComment}>Submit comment</Button>
      </Box>
      <hr />
      <Button onClick={fetchComments}>Load comments</Button>
      {comments.map((comment: any) => {
        return (
          <Box key={comment.id}>
            {comment.id}. {comment.text}
            <Button onClick={() => deleteComment(comment.id)}>Delete</Button>
          </Box>
        );
      })}
    </>
  );
}

export default CommentsPage;
