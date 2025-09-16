import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { getTodos, createTodos, updateTodos, deleteTodos, changeStatus } from "../myApi/apiTodos";
import type { FieldValues } from "react-hook-form";

function useTodos(page: number, selectedUser: number | "", currentFilter: string) {
  const queryClient = useQueryClient();

  const todosQuery = useQuery({
    queryKey: ["todos", { page, selectedUser, currentFilter }],
    queryFn: () => getTodos(page, selectedUser, currentFilter),
    staleTime: 1000 * 60,
  });

  const createTodo = useMutation({
    mutationFn: createTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo created successfully!");
    },
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FieldValues }) =>
      updateTodos(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo updated successfully!");
    },
  });

  const deleteTodo = useMutation({
    mutationFn: (id: number) => deleteTodos(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Todo deleted successfully!");
    },
  });

  const toggleStatus = useMutation({
    mutationFn: changeStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      toast.success("Status changed!");
    },
  });

  return { todosQuery, createTodo, updateTodo, deleteTodo, toggleStatus };
}

export default useTodos;
