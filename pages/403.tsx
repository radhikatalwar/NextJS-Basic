import { Typography } from "@mui/material";
import { Container } from "@mui/system";
import { NextPage } from "next";

const NoPermission: NextPage = ({ users }: any) => {
  return (
    <Container>
      <Typography variant="h1">Permission Denied</Typography>
    </Container>
  );
};

export default NoPermission;
