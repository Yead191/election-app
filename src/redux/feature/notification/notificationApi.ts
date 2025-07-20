import { baseApi } from "@/redux/base/baseApi";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get Notification
    getNotification: build.query({
      query: () => ({
        url: "/notification",
        method: "GET",
        credentials: "include",
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

export const { useGetNotificationQuery , useReadAllNotificationMutation} = notificationApi;
