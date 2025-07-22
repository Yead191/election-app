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
      providesTags: ["Notifications"],
      keepUnusedDataFor: 0,
    }),
    // read all notification
    readAllNotification: build.mutation({
      query: () => ({
        url: "/notification/read-all",
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Notifications"],
    }),
    // read one notification
    readOneNotification: build.mutation({
      query: (id) => ({
        url: `/notification/read/${id}`,
        method: "PATCH",
        credentials: "include",
      }),
      invalidatesTags: ["Notifications"],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useReadAllNotificationMutation,
  useReadOneNotificationMutation,
} = notificationApi;
