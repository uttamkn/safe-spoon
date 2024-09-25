import { UserT } from "@/types";
import axios from "axios";

export const fetchUserData = async () => {
  const res = await axios.get("/api/profile/get-user-profile");
  return res.data.user;
};

export const updateUserData = async (user: UserT) => {
  const res = await axios.put("/api/profile/update-user-profile", user);
  return res.data.user;
};
