import type { FieldValues } from "react-hook-form";
import apiClient from "../apiClient/apiClient";
import type { Todos } from "../types/types";

export const getTodos = async (page: number, selectedUser: number | "", currentFilter: string) => {
  const limit = 7;
  let url = `/todos?_page=${page}&_limit=${limit}`;
  
  if (currentFilter !== "") url += `&completed=${currentFilter}`;
  if (selectedUser !== "") url += `&userId=${selectedUser}`;

  const res = await apiClient.get<Todos[]>(url);
  
  return {
    data: res.data,
    totalCount: Number(res.headers["x-total-count"]),
  };
};

export const createTodos = async (data: FieldValues) => {
  const res = await apiClient.post("/todos", data);
  return res.data;
};

export const updateTodos = async (id: number, data: FieldValues) => {
  const res = await apiClient.put(`/todos/${id}`, data);
  return res.data;
};

export const deleteTodos = async (id: number) => {
  const res = await apiClient.delete(`/todos/${id}`);
  return res.data;
};

export const changeStatus = async (todo: Todos) => {
  const res = await apiClient.patch(`/todos/${todo.id}`, {
    completed: !todo.completed,
  });
  return res.data;
};
