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
    removeFavourite: builder.mutation<
      string,
      {
        userId: string;
        templateId: string;
      }
    >({
      query: ({ userId, templateId }) => ({
        url: `/users/${userId}/favourites/${templateId}`,
        method: "delete",
      }),
    }),
    updateAvatar: builder.mutation<
      string,
      {
        userId: string;
        image: string;
      }
    >({
      query: ({ userId, image }) => ({
        url: `/users/${userId}/avatar`,
        method: "put",
        data: {
          image,
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export default extendedApi;

export const {
  useSignUpMutation,
  useAddFavouriteMutation,
  useRemoveFavouriteMutation,
  useUpdateAvatarMutation,
} = extendedApi;
