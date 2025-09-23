import { useEffect, useState } from "react";
import type { Product } from "../types/types";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";

function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const queryIf = selectedCategory === "" ? orderBy("createdAt", "asc") : where("categoryId", "==", selectedCategory)

  const q = query(
      collection(db, "products"),
      queryIf
  )

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const getProducts: Product[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(getProducts);
    });
    return () => unsubscribe();
  }, [selectedCategory]);


  return { products, selectedCategory, setSelectedCategory };
}

export default useProducts;
