import axios from "axios";

const baseUrl = "http://localhost:9999";
const token = () => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Get all users
export const getAllUsers = async () => {
  const res = await axios.get(`${baseUrl}/users`, {
    headers: token(),
  });
  return res.data;
};

// Get single user
export const findUser = async (userId) => {
  const res = await axios.get(`${baseUrl}/users/finduser/${userId}`, {
    headers: token(),
  });
  return res.data;
};

// Add a new user
export const addUser = async (newUser) => {
  const res = await axios.post(`${baseUrl}/users/adduser`, newUser, {
    headers: {
      ...token(),
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Login a user
export const loginUser = async (credentials) => {
  const res = await axios.post(`${baseUrl}/users/loginuser`, credentials);
  return res.data;
};

// Update a user
export const updateUser = async (userId, updatedUser) => {
  const res = await axios.put(
    `${baseUrl}/users/updateuser/${userId}`,
    updatedUser,
    {
      headers: {
        ...token(),
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return res.data;
};

// Delete a user
export const deleteUser = async (userId) => {
  const res = await axios.delete(`${baseUrl}/users/deleteuser/${userId}`, {
    headers: token(),
  });
  return res.data;
};
