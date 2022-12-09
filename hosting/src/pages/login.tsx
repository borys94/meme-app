import React, { ChangeEvent, MouseEvent, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import MuiCard, { CardProps } from "@mui/material/Card";
import InputAdornment from "@mui/material/InputAdornment";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

import { auth } from "../FirebaseConfig";

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up("sm")]: { width: "28rem" },
}));

const LinkStyled = styled("div")(({ theme }) => ({
  fontSize: "0.875rem",
  textDecoration: "none",
  color: theme.palette.primary.main,
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

const LoginPage = () => {
  const router = useRouter();
  const [values, setValues] = useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });

  const [signInWithEmailAndPassword, , sigInLoading, loginError] =
    useSignInWithEmailAndPassword(auth);

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const signIn = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const user = await signInWithEmailAndPassword(
      values.email,
      values.password
    );
    if (user) {
      router.push("/");
    }
  };

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1, margin: "auto" }} elevation={4}>
        <CardContent
          sx={{
            padding: (theme) => `${theme.spacing(12, 9, 7)} !important`,
            textAlign: "center",
          }}
        >
          <Box
            sx={{
              mb: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image src="/main.png" alt="me" width="128" height="128" />
          </Box>
          <Box sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 1.5 }}
            >
              Welcome to Meme App! 👋🏻
            </Typography>
          </Box>
          <Box sx={{ m: 1 }}>
            <Typography color="error">{loginError?.message}</Typography>
          </Box>
          <form
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
          >
            <TextField
              autoFocus
              fullWidth
              value={values.email}
              onChange={handleChange("email")}
              id="email"
              label="Email"
              sx={{ marginBottom: 4 }}
            />
            <FormControl fullWidth>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                id="auth-login-password"
                onChange={handleChange("password")}
                type={values.showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box
              sx={{
                mb: 4,
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "space-between",
              }}
            >
              <FormControlLabel control={<Checkbox />} label="Remember Me" />
              <Link href="/">
                <LinkStyled onClick={(e) => e.preventDefault()}>
                  Forgot Password?
                </LinkStyled>
              </Link>
            </Box>
            <Button
              fullWidth
              size="large"
              variant="contained"
              disabled={sigInLoading}
              sx={{ marginBottom: 7 }}
              onClick={signIn}
            >
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
