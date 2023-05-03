import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser = async (user: any) => {
  const res = await api.post("/auth/register", user);
  return res.data;
};