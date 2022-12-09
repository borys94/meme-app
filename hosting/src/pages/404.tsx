import { Box, Typography, Stack } from "@mui/material";
import Image from "next/image";

export default function NotFound() {
  return (
    <Stack marginTop={6} alignItems="center" gap={2}>
      <Image src="/not-found.png" alt="me" width="256" height="256" />
      <Typography variant="h2">404 - page not found</Typography>
    </Stack>
  );
}
