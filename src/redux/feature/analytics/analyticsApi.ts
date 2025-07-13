import { baseApi } from "@/redux/base/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // polling summary
    pollingSummary: build.query({
      query: () => ({
        url: "/polling/summury",
        method: "GET",
        credentials: "include",
      }),
    }),
    // Polling station status
    pollingStationStatus: build.query({
      query: ({ searchTerm, limit }) => ({
        url: `/polling`,
        method: "GET",
        credentials: "include",
        params: {
          searchTerm,
          limit,
        },
      }),
    }),
  }),
});
export const { usePollingSummaryQuery, usePollingStationStatusQuery } =
  analyticsApi;
