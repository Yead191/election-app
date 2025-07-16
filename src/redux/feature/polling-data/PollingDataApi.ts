import { baseApi } from "@/redux/base/baseApi";

const pollingDataApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get polling data
    getPollingData: build.query({
      query: ({ searchTerm, date }) => ({
        url: `/document`,
        method: "GET",
        credentials: "include",
        params: {
          searchTerm,
          date,
        },
      }),
    }),
    // get polling data by id
    getPollingDataById: build.query({
      query: (id) => ({
        url: `/document/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // add polling data
    addPollingData: build.mutation({
      query: ({ data }) => ({
        url: `/document`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    // update polling data
    updatePollingData: build.mutation({
      query: ({ id, data }) => ({
        url: `/document/${id}`,
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
    }),
    // scan result
    scanResult: build.query({
      query: (id) => ({
        url: `/polling/68777cf5ebf7ab0e5f727464`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetPollingDataQuery,
  useGetPollingDataByIdQuery,
  useAddPollingDataMutation,
  useUpdatePollingDataMutation,
  useScanResultQuery,
} = pollingDataApi;
