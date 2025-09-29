import { useEffect, useState } from "react";
import type { Category } from "../types/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "categories"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const categoryList: Category[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Category[];
        setCategories(categoryList);
        setLoading(false);
      },
      (err) => {
        console.error("Error fetching categories:", err);
        setError("Failed to fetch categories");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addCategory = async (newCategory: Omit<Category, "id">) => {
    try {
      await addDoc(collection(db, "categories"), {
        ...newCategory,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Add category error:", err);
      setError("Failed to add category");
    }
  };

  const updateCategory = async (id: string, updatedData: Partial<Category>) => {
    try {
      const docRef = doc(db, "categories", id);
      await updateDoc(docRef, updatedData);
    } catch (err) {
      console.error("Update category error:", err);
      setError("Failed to update category");
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const docRef = doc(db, "categories", id);
      await deleteDoc(docRef);
    } catch (err) {
      console.error("Delete category error:", err);
      setError("Failed to delete category");
    }
  };

  return { categories, error, addCategory, updateCategory, deleteCategory, loading };
}

export default useCategories;