import axios from "axios";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosRequestConfig, AxiosError } from "axios";

const axiosBaseQuery =
  (): BaseQueryFn<
    {
      url: string;
      method: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axios({ url, method, data, params });
      if ("error" in result) {
        return {
          error: result.data,
        };
      }

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const api = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery(),
  tagTypes: ["auth"],
  endpoints: () => ({}),
});