import { baseApi } from "@/redux/base/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get Notification
    getNotification: build.query({
      query: ({ page, limit }) => ({
        url: "/notification",
        method: "GET",
        credentials: "include",
        params: {
          page,
          limit,
        },
      }),
    }),
    // read all notification
    readAllNotification: build.mutation({
      query: () => ({
        url: "/notification/read-all",
        method: "PATCH",
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetNotificationQuery, useReadAllNotificationMutation } =
  notificationApi;
