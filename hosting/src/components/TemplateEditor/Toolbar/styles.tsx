import { styled } from "@mui/material/styles";

export const Button = styled("div")<{ active?: boolean }>(
  ({ active, theme }) => ({
    width: 48,
    height: 48,
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 150ms",
    backgroundColor: active && theme.palette.primary.main,
    ":hover": {
      backgroundColor: "#eee",
    },
  })
);

export const FontButton = styled(Button)(() => ({
  width: 120,
}));
