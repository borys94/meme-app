import { createTheme } from "@mui/material/styles";

import typography from "./base/typography";
import palette from "./base/palette";
import breakpoints from "./base/breakpoints";

import button from "./components/button";
import avatar from "./components/avatar";

const theme = createTheme({
  typography: { ...typography },
  palette: { ...palette },
  breakpoints: { ...breakpoints },
  components: {
    MuiButton: { ...button },
    MuiAvatar: { ...avatar },
  },
});

export default theme;
