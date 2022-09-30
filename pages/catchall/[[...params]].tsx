import { Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { NextPage } from "next";
import { useRouter } from "next/router";

const CatchAll: NextPage = () => {
  const router = useRouter();
  const { params = [] } = router.query;
  {
    console.log(params);
  }

  return (
    <Container>
      <Typography variant="h1">Catch All</Typography>
      <Box>
        <Typography>Catch All Params</Typography>
      </Box>
    </Container>
  );
};

export default CatchAll;
