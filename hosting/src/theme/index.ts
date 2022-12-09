import { createTheme } from "@mui/material/styles";

import typography from "./base/typography";
import palette from "./base/palette";

const theme = createTheme({
  typography: { ...typography },
  palette: { ...palette },
  // components: {
  //   MuiBackdrop: { ...backdrop },
  //   MuiPaper: { ...paper },
  //   MuiList: { ...list },
  //   MuiListItemButton: { ...listItemButton },
  //   MuiDialogTitle: { ...dialogTitle },
  //   MuiDialogActions: { ...dialogActions },
  //   MuiTextField: { ...textField },
  //   MuiDialogContent: { ...dialogContent },
  //   MuiTabs: { ...tabs },
  //   MuiTab: { ...tab },
  //   MuiDivider: { ...divider },
  //   MuiMenuItem: { ...menuItem },
  //   MuiInputBase: { ...inputBase }
  // }
});

export default theme;
