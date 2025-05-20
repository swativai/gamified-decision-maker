import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api',
});

export const TAGS = {
  USER: 'user',
} as const;

export const baseAPI = createApi({
  reducerPath: 'baseAPI',
  baseQuery,
  tagTypes: Object.values(TAGS),
  endpoints: () => ({}),
});
