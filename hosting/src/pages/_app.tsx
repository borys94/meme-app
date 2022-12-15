import * as React from "react";
import { Provider } from "react-redux";
import Head from "next/head";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";

import { CacheProvider } from "@emotion/react";
import theme from "../theme";
import createEmotionCache from "../utils/createEmotionCache";
import AppBar from "@components/AppBar";
import Footer from "@components/Footer";
import { AppContextProvider } from "@components/AppContextProvider";

import { configureApi } from "@services/api";
import store from "../stores";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
configureApi();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Meme app</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles
            styles={{ a: { textDecoration: "none", color: "initial" } }}
          />
          <AppContextProvider>
            <AppBar />
            <Container sx={{ mb: 2, minHeight: "calc(100vh - 200px)" }}>
              <Component {...pageProps} />
            </Container>
            <Footer />
          </AppContextProvider>
        </ThemeProvider>
      </Provider>
    </CacheProvider>
  );
}
