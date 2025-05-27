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

export const roomDetailsApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getAllRooms: build.query<Room[], void>({
      query: () => ({
        url: '/room/details',
      }),
    }),
  }),
});

export const { useGetAllRoomsQuery } = roomDetailsApi;
