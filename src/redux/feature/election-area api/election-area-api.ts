import { baseApi } from "@/redux/base/baseApi";

const electionAreaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get election area
    getElectionArea: build.query({
      query: ({ searchTerm }) => ({
        url: `/polling-station`,
        method: "GET",
        credentials: "include",
        params: {
          searchTerm,
        },
      }),
    }),
    // create election area
    createElectionArea: build.mutation({
      query: (data) => ({
        url: `/polling-station`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    // update election area
    updateElectionArea: build.mutation({
      query: ({ id, data }) => ({
        url: `/polling-station/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
    }),
    // delete election area
    deleteElectionArea: build.mutation({
      query: ({ id }) => ({
        url: `/polling-station/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetElectionAreaQuery,
  useCreateElectionAreaMutation,
  useUpdateElectionAreaMutation,
  useDeleteElectionAreaMutation,
} = electionAreaApi;
