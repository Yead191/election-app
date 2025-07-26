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
      providesTags: ["Stations"],
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
      query: ({ id }) => ({
        url: `/user/delete-admin/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    // get station for admin
    getStationForAdmin: build.query({
      query: ({ searchTerm }) => ({
        url: `/polling-station/for-admin`,
        method: "GET",
        credentials: "include",
        params: {
          searchTerm,
        },
      }),
    }),
    // assign station
    assignStation: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/add-stations/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["Stations"],
    }),
  }),
});

export const {
  useGetAdminListQuery,
  useCreateAdminMutation,
  useUpdateStatusMutation,
  useDeleteAdminMutation,
  useGetStationForAdminQuery,
  useAssignStationMutation,
} = adminApi;
