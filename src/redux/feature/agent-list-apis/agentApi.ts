import { baseApi } from "@/redux/base/baseApi";
import { get } from "http";

const agentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get agent list
    getAgentList: build.query({
      query: ({ searchTerm }) => ({
        url: `/user`,
        method: "GET",
        credentials: "include",
        params: {
          role: "AGENT",
          searchTerm,
        },
      }),
    }),

    // get agent profile
    getAgentProfile: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // update agent status
    updateAgentStatus: build.mutation({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
    }),
    // update agent password
    updateAgentPassword: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/change-password/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
    }),
    // update agent profile
    updateAgentProfile: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});
export const {
  useGetAgentListQuery,
  useGetAgentProfileQuery,
  useUpdateAgentStatusMutation,
  useUpdateAgentPasswordMutation,
} = agentApi;
