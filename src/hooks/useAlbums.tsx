import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAlbums, postAlbums, deleteAlbums } from "../myApi/apiAlbums";
import { toast } from "react-toastify";

function useAlbums() {
  const queryClient = useQueryClient();

  const albumsQuery = useQuery({
    queryKey: ["albums"],
    queryFn: getAlbums,
    staleTime: 1000 * 60,
  });

  const createAlbum = useMutation({
    mutationFn: postAlbums,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      toast.success("Album created successfully!");
    },
  });

  const removeAlbum = useMutation({
    mutationFn: deleteAlbums,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      toast.success("Album deleted successfully!");
    },
  });

  return { albumsQuery, createAlbum, removeAlbum };
}

export default useAlbums;
