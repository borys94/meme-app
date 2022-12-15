import axios from "axios";
import { createApi, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { AxiosRequestConfig, AxiosError } from "axios";
import store from "@stores/index";
import { addErrorNotification } from "@stores/notifications";

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
      const result: any = await axios({ url, method, data, params });
      if (result.error) {
        store.dispatch(addErrorNotification(result.error));
        return {
          error: result.error,
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
