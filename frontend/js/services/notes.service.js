import { API_BASE_URL } from "../config/api.js";

export const getAllNotes = async () => {
  const res = await fetch(`${API_BASE_URL}/notes/getallnotes`, {
    method: "GET",
    credentials: "include",
  });
  return res.json();
};

export const createNote = async (data) => {
  const res = await fetch(`${API_BASE_URL}/notes/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return res.json();
};
