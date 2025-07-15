import { baseApi } from "@/redux/base/baseApi";

const settingsPagesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // about us page
    getSettingsPage: build.query({
      query: ({ type }) => ({
        url: `/disclaimer?type=${type}`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // add about us content
    addSettingsContent: build.mutation({
      query: ({ data }) => ({
        url: `/disclaimer`,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    // get faq page
    getFaqPage: build.query({
      query: () => ({
        url: `/faq`,
        method: "GET",
        credentials: "include",
      }),
    }),
    // add faq
    addFaq: build.mutation({
      query: ({ data }) => ({
        url: `/faq`,
        method: "POST",
        body: data,
      }),
    }),
    // update faq
    updateFaq: build.mutation({
      query: ({ id, data }) => {
        // console.log("Bwaa", data);
        return {
          url: `/faq/${id}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useAddSettingsContentMutation,
  useGetSettingsPageQuery,
  useGetFaqPageQuery,
  useAddFaqMutation,
  useUpdateFaqMutation,
} = settingsPagesApi;
