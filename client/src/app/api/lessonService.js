import { apiService } from '../store/apiService';
export const LessonService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getLessons: builder.query({
            query: () => `lessons`,
            providesTags: ['lesson'],
        }),

        getLesson: builder.query({
            query: (id) => `lessons/${id}`,
            providesTags: ['lesson'],
        }),

        deleteLesson: builder.mutation({
            query: ({ id, headers }) => ({
                url: `lessons/${id}`,
                method: 'DELETE',
                headers: headers,
            }),
            invalidatesTags: ['lesson'],
        }),
        deleteWordFromLesson: builder.mutation({
            query: ({ id, headers, wordId }) => ({
                url: `lessons/${id}/${wordId}`,
                method: 'DELETE',
                headers: headers,
            }),
            invalidatesTags: ['lesson'],
        }),
        updateLesson: builder.mutation({
            query: ({ data, id, headers }) => ({
                url: `lessons/${id}`,
                method: 'PUT',
                body: data,
                headers: headers,
            }),
            invalidatesTags: ['lesson'],
        }),
        addWordToLesson: builder.mutation({
            query: ({ lessonId, wordId, headers }) => ({
                url: `lessons/${lessonId}/${wordId}`,
                method: 'POST',
                headers: headers,
            }),
            invalidatesTags: ['lesson'],
        }),
        createLesson: builder.mutation({
            query: ({ data, headers }) => ({
                url: `lessons`,
                method: 'POST',
                headers: headers,
                body: data,
            }),
            invalidatesTags: ['lesson'],
        }),
    }),
});

export const {
    useGetLessonsQuery,
    useGetLessonQuery,
    useDeleteLessonMutation,
    useUpdateLessonMutation,
    useAddWordToLessonMutation,
    useCreateLessonMutation,
    useDeleteWordFromLessonMutation,
} = LessonService;
