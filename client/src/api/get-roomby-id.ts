import { baseAPI } from '../stores/base-api';

export interface Room {
  _id: string;
  title: string;
  description: string;
  creatorId: {
    _id: string;
    username: string;
    email: string;
  };
  maxParticipants: number;
  roomCode: string;
  inviteLink: string;
  isOpen: boolean;
  participants: Participant[];
  createdAt: string;
}

export interface Participant {
  name: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  joinedAt: string;
}
export interface GetRoomParams {
  roomId: string;
}

export const getRoomByIdApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getRoomById: build.query<Room, GetRoomParams>({
      query: ({ roomId }) => ({
        url: `/room/${roomId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetRoomByIdQuery } = getRoomByIdApi;
