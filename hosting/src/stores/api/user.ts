import { api } from ".";

import { ScoreModel } from "$shared/models/score";

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
    }),
    getUserScores: builder.query<ScoreModel[], void>({
      query: () => ({
        url: "/user/scores",
        method: "get"
      })
    }),
    addScore: builder.mutation<string, number>({
      query: (score) => ({
        url: "/user/scores",
        method: "post",
        data: {
          score
        }
      })
    })
  }),
  overrideExisting: false
});

export default extendedApi;

export const { useGetUserScoresQuery, useSignUpMutation, useAddScoreMutation } = extendedApi;
