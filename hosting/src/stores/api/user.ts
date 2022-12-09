import { api } from ".";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<string, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/auth/signUp",
        method: "post",
        data: {
          email,
          password,
        },
      }),
    }),
    addFavourite: builder.mutation<
      string,
      {
        userId: string;
        templateId: string;
      }
    >({
      query: ({ userId, templateId }) => ({
        url: `/users/${userId}/favourites`,
        method: "post",
        data: {
          templateId,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export default extendedApi;

export const { useSignUpMutation, useAddFavouriteMutation } = extendedApi;
