import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_SERVER_URL,
    prepareHeaders: (headers) => {
      headers.set('ngrok-skip-browser-warning', '69420')
      return headers
    },
  }),
  tagTypes: ['Auth', 'Service', 'Bill', 'Report', 'Survey'],
  endpoints: (builder) => ({}),
})
