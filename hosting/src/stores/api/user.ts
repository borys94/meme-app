import { api } from ".";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<string, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/auth/signUp",
        method: "post",
        data: {
          email,
          password
        }
      })
    })
  }),
  overrideExisting: false
});

export default extendedApi;

export const { useSignUpMutation } = extendedApi;
