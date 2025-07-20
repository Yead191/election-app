import { baseApi } from "@/redux/base/baseApi";

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // polling summary
    pollingSummaryV2: build.query({
      query: () => ({
        url: "/polling/summury",
        method: "GET",
        credentials: "include",
      }),
    }),
    // Polling station status
    pollingStationStatus: build.query({
      query: ({ searchTerm, limit, date, page }) => ({
        url: `/polling`,
        method: "GET",
        credentials: "include",
        params: {
          searchTerm,
          limit,
          date,
          page,
        },
      }),
    }),
  }),
});
export const { usePollingSummaryV2Query, usePollingStationStatusQuery } =
  analyticsApi;
