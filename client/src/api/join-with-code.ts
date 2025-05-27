import { baseAPI } from '../stores/base-api';

// src/features/api/roomApi.ts
interface JoinRoomForm {
  roomCode: string;
}

interface JoinRoomResponse {
  message: string;
  roomId: string;
}

export const joinWithCodeApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    joinWithCode: build.mutation<JoinRoomResponse, JoinRoomForm>({
      query: (body) => ({
        url: '/join/room',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useJoinWithCodeMutation } = joinWithCodeApi;
