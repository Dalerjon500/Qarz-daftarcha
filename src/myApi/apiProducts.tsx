import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { Product } from "../types/types";
import { db } from "../firebase";

const q = query(
    collection(db, "products"),
    orderBy("createdAt", "asc")
)

export const getProducts = async (): Promise<Product[]> => {
  try {
    const snapshot = await getDocs(q);
    
    const products: Product[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];

    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
