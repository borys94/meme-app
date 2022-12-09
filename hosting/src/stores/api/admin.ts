import { api } from ".";

const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<string, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `/admin/users/${id}`,
        method: "post",
        data: {
          role,
        },
      }),
    }),
    addTemplate: builder.mutation<string, { title: string; image: string }>({
      query: ({ title, image }) => ({
        url: "/admin/templates",
        method: "post",
        data: {
          title,
          image,
        },
        // headers: {
        //   'Content-Type': 'multipart/form-data'
        // }
      }),
    }),
  }),
  overrideExisting: false,
});

export default extendedApi;

export const { useUpdateUserMutation, useAddTemplateMutation } = extendedApi;
