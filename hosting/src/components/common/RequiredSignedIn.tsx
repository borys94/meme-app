import Link from "next/link";
import { useContext } from "react";
import { Box, Button, Typography } from "@mui/material";

import { AppContext } from "@components/AppContextProvider";

interface Props {
  children: React.ReactElement;
  message: string;
}

const RequiredSignedIn = ({ children, message }: Props) => {
  const { user } = useContext(AppContext);

  if (!user) {
    return (
      <Box>
        <Typography sx={{ mb: 1 }}>{message}</Typography>
        <Link href="/login" passHref>
          <Button variant="contained">Sign in</Button>
        </Link>
      </Box>
    );
  }

  return children;
};

export default RequiredSignedIn;
