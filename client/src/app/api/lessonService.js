import { apiService } from '../store/apiService';

export const lessonService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getLesson: builder.query({
            query: (lessonId) => ({
                url: `lessons/${lessonId}`,
            }),
        }),
        getLessons: builder.query({
            query: () => ({
                url: `lessons`,
            }),
        }),
        createLesson: builder.mutation({
            query: (lesson) => ({
                url: `lessons`,
                method: 'POST',
                body: lesson,
            }),
        }),
        updateLesson: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `lessons/${id}`,
                method: 'PATCH',
                body: patch,
            }),
        }),
        deleteLesson: builder.mutation({
            query: (id) => ({
                url: `lessons/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
    overrideExisting: false,
});

export const {
    useGetLessonQuery,
    useGetLessonsQuery,
    useCreateLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} = lessonService;