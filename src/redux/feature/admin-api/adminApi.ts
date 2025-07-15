import { baseApi } from "@/redux/base/baseApi";

const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get admin list
    getAdminList: build.query({
      query: ({ searchTerm, status }) => ({
        url: `/user`,
        method: "GET",
        credentials: "include",
        params: {
          role: "ADMIN",
          searchTerm,
          status,
        },
      }),
    }),
    // create admin
    createAdmin: build.mutation({
      query: (data) => ({
        url: `/user`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    // update status toggle
    updateStatus: build.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
    // delete admin
    deleteAdmin: build.mutation({
      query: ({id}) => ({
        url: `/user/delete-admin/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetAdminListQuery,
  useCreateAdminMutation,
  useUpdateStatusMutation,
  useDeleteAdminMutation,
} = adminApi;
