import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../myApi/apiProducts";

function useProducts(categoryId?: string) {
  const productQuery = useQuery({
    queryKey: ["products", categoryId],
    queryFn: () => getProducts(),
    staleTime: 1000 * 60,
  });

  return { productQuery };
}

export default useProducts;
