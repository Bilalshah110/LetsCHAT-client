import axios from "axios";

const baseUrl = "http://localhost:9999";
const token = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all chats
export const getAllChats = async () => {
  const res = await axios.get(`${baseUrl}/chats`, {
    headers: token(),
  });
  return res.data;
};

// Find a chat
export const findChat = async (ids) => {
  const res = await axios.get("http://localhost:9999/chats/findchat", {
    params: ids,
  });
  return res.data;
};
