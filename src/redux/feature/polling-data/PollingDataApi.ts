import { baseApi } from "@/redux/base/baseApi";

const pollingDataApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get polling data
    getPollingData: build.query({
      query: ({ searchTerm, date, page, limit }) => ({
        url: `/document`,
        method: "GET",
        credentials: "include",
        params: {
          searchTerm,
          date,
          page,
          limit,
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
        url: `/polling/${id}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // scan document
    scanDocument: build.mutation({
      query: ({ data }) => ({
        url: `/document/scan`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    // publish document
    publishDocument: build.mutation({
      query: ({ id }) => ({
        url: `/document/${id}`,
        method: "PATCH",
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
  useScanDocumentMutation,
  usePublishDocumentMutation,
} = pollingDataApi;
