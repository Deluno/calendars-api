import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://react-http-eedcc-default-rtdb.europe-west1.firebasedatabase.app/',
  }),
  tagTypes: ['Event'],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'events.json',
      providesTags: ['Event'],
    }),
    postEvent: builder.mutation({
      query: (event) => ({
        url: 'events.json',
        method: 'POST',
        body: event,
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const { useGetEventsQuery, usePostEventMutation } = apiSlice;
