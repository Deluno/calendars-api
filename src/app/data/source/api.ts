import {
  CalendarEventPostRequest,
  CalendarEventPutRequest,
  CalendarTaskPostRequest,
  LoginRequest,
  RegistrationRequest,
} from '@/types/requests';
import {
  CalendarEntityResponse,
  LoginResponse,
  UserResponse,
  UserWithCalendarsResponse,
} from '@/types/responses';
import { Calendar } from '@/types/calendars';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/app/data/store';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://localhost:7097/api/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).userState.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Task', 'Event', 'Calendar', 'User', 'SubscribedCalendar'],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user: RegistrationRequest) => ({
        url: 'Authentication/register',
        method: 'POST',
        body: user,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (user: LoginRequest) => ({
        url: 'Authentication/login',
        method: 'POST',
        body: user,
      }),
    }),

    getEvents: builder.query<CalendarEntityResponse[], void>({
      query: () => 'CalendarEvent',
      transformResponse: (response: CalendarEntityResponse[]) => {
        return response.map((event) => ({
          ...event,
          type: 'event',
        }));
      },
      providesTags: ['Event'],
    }),
    postEvent: builder.mutation({
      query: (event: CalendarEventPostRequest) => ({
        url: 'CalendarEvent',
        method: 'POST',
        body: event,
      }),
      invalidatesTags: ['Event'],
    }),
    putEvent: builder.mutation<void, CalendarEventPutRequest>({
      query: ({ id, ...event }) => ({
        url: `CalendarEvent/${id}`,
        method: 'PUT',
        body: event,
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation({
      query: (id: number) => ({
        url: `CalendarEvent/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Event'],
    }),

    getTasks: builder.query<CalendarEntityResponse[], void>({
      query: () => 'CalendarTask',
      transformResponse: (response: CalendarEntityResponse[]) => {
        return response.map((task) => ({
          ...task,
          type: 'task',
        }));
      },
      providesTags: ['Task'],
    }),
    postTask: builder.mutation({
      query: (task: CalendarTaskPostRequest) => ({
        url: 'CalendarTask',
        method: 'POST',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    putTask: builder.mutation({
      query: ({ id, ...task }) => ({
        url: `CalendarTask/${id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: builder.mutation({
      query: (id: number) => ({
        url: `CalendarTask/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Task'],
    }),

    getCalendars: builder.query<Calendar[], { saved?: boolean }>({
      query: ({ saved = false }) => ({
        url: `Calendar?subscribed=${saved}`,
      }),
      providesTags: ['Calendar', 'SubscribedCalendar'],
    }),
    postCalendar: builder.mutation<void, Calendar>({
      query: (calendar) => ({
        url: `Calendar`,
        method: 'POST',
        body: calendar,
      }),
      invalidatesTags: ['Calendar'],
    }),
    putCalendar: builder.mutation<void, Calendar>({
      query: ({ id, ...calendar }) => ({
        url: `Calendar/${id}`,
        method: 'PUT',
        body: calendar,
      }),
      invalidatesTags: ['Calendar'],
    }),
    deleteCalendar: builder.mutation<void, number>({
      query: (id) => ({
        url: `Calendar/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Calendar', 'Event'],
    }),
    subscribeToCalendar: builder.mutation<void, number>({
      query: (id) => ({
        url: `Calendar/${id}/subscribe`,
        method: 'POST',
      }),
      invalidatesTags: ['SubscribedCalendar'],
    }),
    unsubscribeFromCalendar: builder.mutation<void, number>({
      query: (id) => ({
        url: `Calendar/${id}/unsubscribe`,
        method: 'POST',
      }),
      invalidatesTags: ['SubscribedCalendar'],
    }),

    getUsers: builder.query<UserResponse[], string>({
      query: (username: string) => `AppUser?username=${username}`,
      providesTags: ['User'],
    }),
    getUsersWithCalendars: builder.query<UserWithCalendarsResponse[], string>({
      query: (username: string) =>
        `AppUser?username=${username}&includeCalendars=true`,
      keepUnusedDataFor: 5,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,

  useGetEventsQuery,
  usePostEventMutation,
  usePutEventMutation,
  useDeleteEventMutation,

  useGetTasksQuery,
  usePostTaskMutation,
  usePutTaskMutation,
  useDeleteTaskMutation,

  useGetCalendarsQuery,
  usePostCalendarMutation,
  usePutCalendarMutation,
  useDeleteCalendarMutation,
  useSubscribeToCalendarMutation,
  useUnsubscribeFromCalendarMutation,

  useGetUsersQuery,
  useGetUsersWithCalendarsQuery,
} = apiSlice;
