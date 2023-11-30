import { apiService } from '../store/apiService';
const headers = { accessToken: JSON.parse(localStorage.getItem('user')).token };

export const RequestService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllRequest: builder.query({
            query: () => ({
                url: `requests`,
                headers,
            }),
            providesTags: ['request'],
        }),

        createRequest: builder.mutation({
            query: (data) => ({
                url: `requests`,
                method: 'POST',
                body: data,
                headers,
            }),
            invalidatesTags: ['request'],
        }),

        updateRequest: builder.mutation({
            query: ({ data, id }) => ({
                url: `requests/${id}`,
                method: 'PUT',
                body: data,
                headers,
            }),
            invalidatesTags: ['request'],
        }),
    }),
});

export const { useGetAllRequestQuery, useCreateRequestMutation, useUpdateRequestMutation } = RequestService;
