import { UserT } from "@/types";
import axios from "axios";

export const sendOtpEmail = async (email: string): Promise<void> => {
  try {
    await axios.put("/api/auth/send-email-verification", { email });
    console.log("Email sent");
  } catch (err) {
    throw new Error("Failed to send the email verification");
  }
};

export const verifyOtpEmail = async (code: number): Promise<void> => {
  try {
    await axios.delete("/api/auth/verify-email", {
      data: {
        verificationCode: code,
      },
    });
  } catch (err) {
    throw new Error("Failed to verify the email");
  }
};

export const getTokenAfterSignUp = async (data: UserT): Promise<string> => {
  const res = await axios.post("/api/auth/sign-up", {
    ...data,
  });
  return res.data.token;
};

export const getTokenAfterSignIn = async (data: {
  email: string;
  password: string;
}): Promise<string> => {
  const res = await axios.post("/api/auth/sign-in", data);
  return res.data.token;
};

export const sendForgotPasswordEmail = async (
  email: string,
): Promise<string> => {
  const res = await axios.post("/api/auth/forgot-password", { email });
  return res.data.message;
};

export const resetPassword = async (
  password: string,
  token: string,
): Promise<string> => {
  const res = await axios.put(`/api/auth/reset-password/${token}`, {
    password,
  });
  return res.data.message;
};
