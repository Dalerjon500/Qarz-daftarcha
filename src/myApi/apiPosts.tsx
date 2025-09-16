import apiClient from "../apiClient/apiClient";
import type { FieldValues } from "react-hook-form";
import type { Post } from "../types/types";

export const getPosts = async (page: number, selectedUser: number | "") => {
  const limit = 10;
  let url = `/posts?_page=${page}&_limit=${limit}`;
  if (selectedUser !== "") url += `&userId=${selectedUser}`;
  const res = await apiClient.get<Post[]>(url);
  return res.data;
};

export const createPosts = (data: FieldValues) =>{
  apiClient.post("/posts", data).then((res) => res.data);
}
 
export const updatePosts = (id: number, data: FieldValues) =>{
  apiClient.put(`/posts/${id}`, data).then((res) => res.data);
}

export const deletePosts = (id: number) => {
  apiClient.delete(`/posts/${id}`).then((res) => res.data);
}
