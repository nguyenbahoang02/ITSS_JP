// searchHistoryApi.js

import { apiService } from '../store/apiService';

export const searchHistoryService = apiService.injectEndpoints({
  endpoints: (builder) => ({
    createSearchRecord: builder.mutation({
      query: ({ data, headers }) => ({
        url: 'users/search-history',
        method: 'POST',
        body: data,
        headers: headers,
      }),
      invalidatesTags: ['search-history'],
      onError: (error) => {
        console.error('Error creating search record:', error);
        // Handle error as needed
      },
    }),

    getSearchHistory: builder.query({
      query: ({ id, headers }) => ({
        url: `users/search-history/${id}`,
        method: 'GET',
        headers: headers,
      }),
      providesTags: ['search-history'],
      onError: (error) => {
        console.error('Error getting search history:', error);
        // Handle error as needed
      },
    }),
  }),
});

export const { useCreateSearchRecordMutation, useGetSearchHistoryQuery } = searchHistoryService;
