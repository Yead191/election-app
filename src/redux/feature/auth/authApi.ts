import { baseApi } from "@/redux/base/baseApi";

export type UserType = {
  _id: string;
  name: string;
  email: string;
  role: "ADMIN" | "SUPER_ADMIN";
  image: string;
  status: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),

    login: build.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["profile"],
    }),

    getProfile: build.query({
      query: () => ({
        url: "/users/profile",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["profile"],
    }),
  }),
});

export const { useGetProfileQuery, useLoginMutation, useRegisterUserMutation } =
  authApi;
