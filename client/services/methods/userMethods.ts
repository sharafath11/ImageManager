import { GoogleAuthPayload, LoginPayload, RegisterPayload, ResendOtpPayload, VerifyOtpPayload } from "@/types/user/authTypes";
import { deleteRequest, getRequest, patchRequest, postRequest, putRequest } from "../api";
import { ImageReorderPayload, ImageUpdatePayload } from "@/types/image/imageTypes";

const get = getRequest;
const post = postRequest;
const patch = patchRequest;
const put = putRequest;
const del = deleteRequest;

export const userAuthMethods = {
  register: (payload: RegisterPayload) => post("/auth/signup", payload),
  verifyOtp: (payload: VerifyOtpPayload) => post("/auth/verify-otp", payload),
  resendOtp: (payload: ResendOtpPayload) => post("/auth/resend-otp", payload),
  login: (payload: LoginPayload) => post("/auth/login", payload),
  googleAuth: (payload: GoogleAuthPayload) => post("/auth/google", payload),
  logout: () => post("/auth/logout", {}),
}
export const userMethods = {
  me: () => get("/auth/me"),
} 
export const imageMethods = {
  upload: (formData: FormData) =>post("/images/upload", formData,),

  getAll: () =>get("/images"),

  reorder: (payload: ImageReorderPayload[]) =>patch("/images/reorder", payload),

  update: (id: string, payload: ImageUpdatePayload) => put(`/images/${id}`, payload),

  delete: (id: string) =>del(`/images/${id}`)
}