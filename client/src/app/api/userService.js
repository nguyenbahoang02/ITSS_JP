import { apiService } from '../store/apiService';

export const UserService = apiService.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: (headers) => ({
                url: 'users',
                headers: headers,
            }),
            providesTags: ['user'],
        }),
        getUserById: builder.query({
            query: (id, headers) => ({
                url: `users/${id}`,
                headers: headers,
            }),
            providesTags: ['user'],
        }),
        createUser: builder.mutation({
            mutation: (user) => ({
                url: '/users',
                method: 'POST',
                body: user,
            }),
            invalidatesTags: ['user'],
        }),
        updateUser: builder.mutation({
            query: ({ id, data, headers }) => ({
                url: `users/update/${id}`,
                method: 'PUT',
                body: data,
                headers: headers,
                
            }),
            invalidatesTags: ['user'],
        }),
        deleteUser: builder.mutation({
            query: ({ id, headers }) => ({
                url: `users/delete/${id}`,
                method: 'DELETE',
                headers: headers,
            }),
            invalidatesTags: ['user'],
        })
    }),
});

export const {
    useGetUsersQuery,
    useGetUserByIdQuery,
    useCreateUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} = UserService;
