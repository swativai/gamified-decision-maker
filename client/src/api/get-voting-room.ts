import { baseAPI } from '../stores/base-api';

export interface IVoteOption {
  text: string;
  voteCount: number;
  votes: {
    userId: string;
    timestamp: string;
  }[];
}

export interface IVotingRoom {
  _id: string;
  title: string;
  creator: {
    _id: string;
    username: string;
    email: string;
  };
  options: IVoteOption[];
  discussion?: string;
  duration: {
    minutes: number;
    hours: number;
    days: number;
  };
  startTime: string;
  endTime: string;
  isVotingOpen: boolean;
  finalResult?: {
    selectedOption: string;
    tieBreakerUsed: string;
    revealedAt: string;
  };
  __v?: number;
}

export interface IVote {
  userId: string;
  timestamp: string;
}

export interface IVoteOption {
  _id: string;
  text: string;
  voteCount: number;
  votes: IVote[];
}

export interface ICreator {
  _id: string;
  username: string;
  email: string;
}

export interface IDuration {
  minutes: number;
  hours: number;
  days: number;
}

export interface IVotingRoomResponse {
  _id: string;
  title: string;
  creator: ICreator;
  options: IVoteOption[];
  startTime: string; // ISO string date
  endTime: string; // ISO string date
  duration: IDuration;
  isVotingOpen: boolean;
}

export const votingRoomApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    getVotingRooms: build.query<IVotingRoomResponse[], IVotingRoom[]>({
      query: () => ({
        url: '/get/voting_room', // Make sure your server endpoint is /api/room or similar
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetVotingRoomsQuery } = votingRoomApi;
