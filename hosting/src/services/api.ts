import Axios from "axios";

import { auth } from "../FirebaseConfig";

const isClientSide = typeof window !== "undefined";

export function configureApi() {
  Axios.interceptors.response.use(
    (response) => {
      return response?.data || response;
    },
    (error) => {
      return error.response?.data;
    }
  );

  Axios.interceptors.request.use(async (config) => {
    if (isClientSide) {
      if (auth.currentUser) {
        const { token } = await auth.currentUser.getIdTokenResult();
        config.headers!.Token = token;
      }
    }

    return {
      baseURL: process.env.NEXT_PUBLIC_PUBLIC_API_URL,
      maxRedirects: 0,
      ...config,
    };
  });
}
