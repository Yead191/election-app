import { baseApi } from "@/redux/base/baseApi";

const nominatedTeamApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get nominated team
    getNominatedTeam: build.query({
      query: ({ searchTerm }) => ({
        url: `/team`,
        method: "GET",
        credentials: "include",
        params: {
          searchTerm,
        },
      }),
    }),

    // create nominated team
    createNominatedTeam: build.mutation({
      query: (data) => ({
        url: `/team`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    // update nominated team
    updateNominatedTeam: build.mutation({
      query: ({ id, data }) => ({
        url: `/team/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
    }),
    // delete nominated team
    deleteNominatedTeam: build.mutation({
      query: ({ id }) => ({
        url: `/team/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetNominatedTeamQuery,
  useCreateNominatedTeamMutation,
  useUpdateNominatedTeamMutation,
  useDeleteNominatedTeamMutation,
} = nominatedTeamApi;
