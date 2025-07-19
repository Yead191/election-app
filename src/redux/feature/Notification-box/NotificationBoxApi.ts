import { baseApi } from "@/redux/base/baseApi";

const notificationBoxApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // send notification
    sendMessage: build.mutation({
      query: ({ data }) => {
        console.log(data);
        return {
          url: `/message`,
          method: "POST",
          body: data,
          credentials: "include",
        };
      },
    }),
    // get messages
    getMessages: build.query({
      query: () => ({
        url: `/message`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSendMessageMutation, useGetMessagesQuery } =
  notificationBoxApi;
