import { baseApi } from "@/redux/base/baseApi";
import Cookies from "js-cookie";
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
    // register

    registerUser: build.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    // login
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
    // update profile
    getProfile: build.query({
      query: () => ({
        url: "/user/profile",
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["profile"],
    }),
    // update profile
    updateProfile: build.mutation({
      query: (data) => ({
        url: "/user/profile",
        method: "PATCH",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["profile"],
    }),
    // change password
    changePassword: build.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["profile"],
    }),
    // forgot password
    forgotPassword: build.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),
    // verify email
    verifyOtp: build.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),
    // reset password
    resetPassword: build.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        body: data,
        headers: {
          Authorization: Cookies.get("resetToken"),
        },
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useLoginMutation,
  useRegisterUserMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useVerifyOtpMutation,
  useResetPasswordMutation,
} = authApi;
