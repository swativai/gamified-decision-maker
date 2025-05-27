import { baseAPI } from '../stores/base-api';
export interface Participant {
  name: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  joinedAt: string;
}

export const getParticipantsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getParticipants: build.query<Participant, unknown>({
      query: (roomId) => `/rooms/${roomId}/participants`,
    }),
  }),
});

export const { useGetParticipantsQuery } = getParticipantsApi;
