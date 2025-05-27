import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const TAGS = {
  USER: 'user',
  ROOM: 'room',
} as const;

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});
