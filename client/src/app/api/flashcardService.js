import { apiService } from '../store/apiService';

export const FlashcardService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllFlashcard: builder.query({
            query: ({ lessonId, headers }) => ({
                url: `flashCards/${lessonId}`,
                headers,
            }),
            providesTags: ['flashcard'],
        }),

        updateFlashcard: builder.mutation({
            query: ({ lessonId, data, headers }) => ({
                url: `flashCards/${lessonId}`,
                method: 'PUT',
                body: data,
                headers,
            }),
            invalidatesTags: ['flashcard'],
        }),

        deleteFlashcard: builder.mutation({
            query: ({ lessonId, flashcardId, headers }) => ({
                url: `flashCards/${lessonId}/${flashcardId}`,
                method: 'DELETE',
                headers,
            }),
            invalidatesTags: ['flashcard'],
        }),
    }),
});

export const { useDeleteFlashcardMutation, useGetAllFlashcardQuery, useUpdateFlashcardMutation } = FlashcardService;
