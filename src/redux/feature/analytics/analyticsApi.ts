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
  }),
});
export const { usePollingSummaryQuery } = analyticsApi;
