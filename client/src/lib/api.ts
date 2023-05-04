import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const registerUser = async (user: any) => {
  const res = await api.post("/auth/register", user);
  return res.data;
};

export const verifyEmail = async (token: string) => {
  const res = await api.get(`/auth/verify-email/${token}`);
  return res.data;
};

export const loginUser = async (user: any) => {
  const res = await api.post("/auth/login", user);
  return res.data;
};
