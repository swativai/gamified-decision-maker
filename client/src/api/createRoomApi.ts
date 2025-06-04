import { baseAPI, TAGS } from '../stores/base-api';

export interface CreateRoomPayload {
  roomId: string;
  roomCode: string;
  title: string;
  description?: string;
  creatorId?: string;
  maxParticipants: number;
}
export interface Room {
  _id: string;
  title: string;
  description: string;
  creatorId: string;
  maxParticipants: number;
  roomCode: string;
  inviteLink: string;
  isOpen: boolean;
  createdAt: string;
  token: string; // ISO date string
  // You can define a Participant type if participants have a specific structure
  __v: number;
}

export const createRoomApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createRoom: build.mutation<Room, CreateRoomPayload>({
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
