import { createTheme } from "@mui/material/styles";

import typography from "./base/typography";
import palette from "./base/palette";

import button from "./components/button";

const theme = createTheme({
  typography: { ...typography },
  palette: { ...palette },
  components: {
    MuiButton: { ...button },
  },
});

export default theme;
