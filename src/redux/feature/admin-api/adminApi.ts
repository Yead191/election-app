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
  }),
});

export const { useGetAdminListQuery , useCreateAdminMutation} = adminApi;
