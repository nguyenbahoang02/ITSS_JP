import { apiService } from '../store/apiService';
export const QuizService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getQuizzes: builder.query({
            query: () => `quizzes`,
            providesTags: ['quiz'],
        }),

        getQuiz: builder.query({
            query: (id) => `quizzes/${id}`,
            providesTags: ['quiz'],
        }),

        getQuestionsOfQuiz: builder.query({
            query: (id) => `questions/${id}`,
            providesTags: ['quiz'],
        }),

        deleteQuiz: builder.mutation({
            query: ({ id, headers }) => ({
                url: `quizzes/${id}`,
                method: 'DELETE',
                headers: headers,
            }),
            invalidatesTags: ['quiz'],
        }),

        deleteQuestion: builder.mutation({
            query: ({ id, headers }) => ({
                url: `questions/${id}`,
                method: 'DELETE',
                headers: headers,
            }),
            invalidatesTags: ['quiz'],
        }),

        createQuiz: builder.mutation({
            query: ({ lessonId, headers }) => ({
                url: `quizzes/${lessonId}`,
                method: 'POST',
                headers: headers,
            }),
            invalidatesTags: ['quiz'],
        }),
        createQuestion: builder.mutation({
            query: ({ quizId, data, headers }) => ({
                url: `questions/${quizId}`,
                method: 'POST',
                headers: headers,
                body: data,
            }),
            invalidatesTags: ['quiz'],
        }),
    }),
});

export const {
    useGetQuizzesQuery,
    useCreateQuizMutation,
    useDeleteQuizMutation,
    useGetQuestionsOfQuizQuery,
    useDeleteQuestionMutation,
    useCreateQuestionMutation,
    useGetQuizQuery,
} = QuizService;
