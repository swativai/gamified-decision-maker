import { baseAPI } from '../stores/base-api';

export const joinWithLinkApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    joinWithLink: build.mutation<unknown, string>({
      query: (roomCode) => ({
        url: `/room/join-from-link/${roomCode}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useJoinWithLinkMutation } = joinWithLinkApi;
