import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  prepareHeaders: (headers) => {
    // Get tokens from localStorage
    const userToken = localStorage.getItem('userToken');
    const roomToken = localStorage.getItem('roomToken');

    // Set user token in Authorization header
    if (userToken) {
      headers.set('Authorization', `Bearer ${userToken}`);
    }

    // Set room token in custom header
    if (roomToken) {
      headers.set('X-Room-Token', roomToken); // ✅ custom header for room
    }

    return headers;
  },
});

export const TAGS = {
  USER: 'user',
  ROOM: 'room',
  VOTE: 'vote',
} as const;

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});
