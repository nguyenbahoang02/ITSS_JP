import { apiService } from '../store/apiService';

export const RequestService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getAllRequest: builder.query({
            query: (headers) => ({
                url: `requests`,
                headers,
            }),
            providesTags: ['request'],
        }),

        createRequest: builder.mutation({
            query: ({data,headers}) => ({
                url: `requests`,
                method: 'POST',
                body: data,
                headers,
            }),
            invalidatesTags: ['request'],
        }),

        updateRequest: builder.mutation({
            query: ({ data, id ,headers}) => ({
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
