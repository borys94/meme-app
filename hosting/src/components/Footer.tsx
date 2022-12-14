import Link from "next/link";
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => (
  <Box component="footer" sx={{ p: 5, backgroundColor: "primary.main" }}>
    <Typography>Created by Marcin Kudla</Typography>
    <Link href="https://github.com/borys94/meme-app" passHref>
      <IconButton sx={{ mt: 1 }}>
        <GitHubIcon />
      </IconButton>
    </Link>
  </Box>
);

export default Footer;
