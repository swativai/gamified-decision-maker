import { baseAPI } from '../stores/base-api';

export const voteApi = baseAPI.injectEndpoints({
  endpoints: (builder) => ({
    voteOnOption: builder.mutation({
      query: ({ data }) => ({
        url: `/vote/`,
        method: 'put',
        body: data,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useVoteOnOptionMutation } = voteApi;
