import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => (
  <Box component="footer" sx={{ p: 5, backgroundColor: "primary.main" }}>
    <Typography>Created by Marcin Kudla</Typography>
    <IconButton>
      <GitHubIcon />
    </IconButton>
  </Box>
);

export default Footer;
