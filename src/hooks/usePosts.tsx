import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import type { FieldValues } from "react-hook-form";
import { getPosts, createPosts, updatePosts, deletePosts } from "../myApi/apiPosts";

function usePosts(page: number, selectedUser: number | "") {
  const queryClient = useQueryClient();

  const postsQuery = useQuery({
    queryKey: ["posts", { page, selectedUser }],
    queryFn: () => getPosts(page, selectedUser),
    staleTime: 1000 * 60,
  });

  const createPost = useMutation({
    mutationFn: createPosts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post created successfully!");
    },
  });

  const updatePost = useMutation({
    mutationFn: ({ id, data }: { id: number; data: FieldValues }) =>
      updatePosts(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post updated successfully!");
    },
  });

  const deletePost = useMutation({
    mutationFn: (id: number) => deletePosts(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Post deleted successfully!");
    },
  });

  return {
    postsQuery,
    createPost: createPost.mutate,
    updatePost: updatePost.mutate,
    deletePost: deletePost.mutate,
  };
}

export default usePosts;
