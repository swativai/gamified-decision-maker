import { baseAPI, TAGS } from '../stores/base-api';

export interface CreateRoomPayload {
  title: string;
  description?: string;
  creatorId?: string;
  maxParticipants: number;
}

export const createRoomApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createRoom: build.mutation<unknown, CreateRoomPayload>({
      invalidatesTags: [TAGS.ROOM],
      query: (room) => ({
        url: '/create/room',
        method: 'POST',
        body: room,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useCreateRoomMutation } = createRoomApi;
