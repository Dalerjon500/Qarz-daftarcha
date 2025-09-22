import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { Category } from "../types/types";
import { db } from "../firebase";

const q = query(
    collection(db, "categories"),
    orderBy("createdAt", "asc")
)

export const getCategories = async (): Promise<Category[]> => {
  try {
    const snapshot = await getDocs(q);

    const categories: Category[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Category[];

    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
