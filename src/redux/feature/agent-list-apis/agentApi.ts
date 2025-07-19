import { baseApi } from "@/redux/base/baseApi";
import { get } from "http";

const agentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get agent list
    getAgentList: build.query({
      query: ({ searchTerm, status }) => ({
        url: `/user`,
        method: "GET",
        credentials: "include",
        params: {
          role: "AGENT",
          searchTerm,
          status,
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
        method: "PUT",
        credentials: "include",
        body: data,
      }),
    }),
    //add agent
    addAgent: build.mutation({
      query: (data) => ({
        url: `/user`,
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    // add agent by excel
    addAgentExcel: build.mutation({
      query: (data) => ({
        url: `/user/agent-excel`,
        method: "POST",
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
  useUpdateAgentProfileMutation,
  useAddAgentMutation,
  useAddAgentExcelMutation,
} = agentApi;
