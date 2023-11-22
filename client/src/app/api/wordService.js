import { apiService } from '../store/apiService';

export const WordService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getWords: builder.query({
            query: () => `words`,
            providesTags: ['word'],
        }),

        getWord: builder.query({
            query: (id) => `words/${id}`,
            providesTags: ['word'],
        }),

        deleteWord: builder.mutation({
            query: ({ id, headers }) => ({
                url: `words/delete/${id}`,
                method: 'DELETE',
                headers: headers,
            }),
            invalidatesTags: ['word'],
        }),

        updateWord: builder.mutation({
            query: ({ data, id, headers }) => ({
                url: `words/update/${id}`,
                method: 'PUT',
                body: data,
                headers: headers,
            }),
            invalidatesTags: ['word'],
        }),
        createWord: builder.mutation({
            query: ({ data, headers }) => ({
                url: `words`,
                method: 'POST',
                headers: headers,
                body: data,
            }),
            invalidatesTags: ['word'],
        }),
    }),
});

export const {
    useDeleteWordMutation,
    useGetWordQuery,
    useGetWordsQuery,
    useUpdateWordMutation,
    useCreateWordMutation,
} = WordService;
