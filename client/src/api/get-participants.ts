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

export interface GetParticipantsParams {
  roomId: string;
  email: string;
  name: string;
  userId: string;
  joinedAt: string; // ISO date string
}
export const getParticipantsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getParticipants: build.query<Participant, GetParticipantsParams>({
      query: ({ roomId }) => `/room/${roomId}/participants`,
    }),
  }),
});

export const { useGetParticipantsQuery } = getParticipantsApi;
