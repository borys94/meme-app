import { TEMPLATE_STATUS, TemplateModel } from "@shared/models/template";
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
    addTemplate: builder.mutation<
      string,
      { title: string; image: string; status: TEMPLATE_STATUS }
    >({
      query: ({ title, image, status }) => ({
        url: "/admin/templates",
        method: "post",
        data: {
          title,
          image,
          status,
        },
      }),
    }),
    editTemplate: builder.mutation<string, Partial<TemplateModel>>({
      query: (template) => ({
        url: `/admin/templates/${template.id}`,
        method: "put",
        data: template,
      }),
    }),
    removeMeme: builder.mutation<
      string,
      {
        userId: string;
        memeId: string;
      }
    >({
      query: ({ userId, memeId }) => ({
        url: `/users/${userId}/memes/${memeId}`,
        method: "delete",
      }),
    }),
  }),
  overrideExisting: false,
});

export default extendedApi;

export const {
  useUpdateUserMutation,
  useAddTemplateMutation,
  useEditTemplateMutation,
  useRemoveMemeMutation,
} = extendedApi;
