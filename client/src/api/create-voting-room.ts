import { baseAPI, TAGS } from '../stores/base-api';

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
  creator: string;
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
interface newRoom {
  title: string;
  options: {
    text: string;
  }[];
  duration: {
    minutes: number;
    hours: number;
    days: number;
  };
}
// first write response type and  second write request type
export const createVotingRoomApi = baseAPI.injectEndpoints({
  endpoints: (build) => ({
    createVotingRoom: build.mutation<IVotingRoom, newRoom>({
      invalidatesTags: [TAGS.VOTE],
      query: (room) => ({
        url: '/create/voting_room',
        method: 'POST',
        body: room,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
});

export const { useCreateVotingRoomMutation } = createVotingRoomApi;
