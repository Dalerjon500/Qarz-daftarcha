import { useEffect, useState } from "react";
import type { Category } from "../types/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function useCategories() {
    const [categories, setCategories] = useState<Category[]>([]);

    const q = query(
        collection(db, "categories"),
        orderBy("createdAt", "asc")
    )

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        try {
            const snapshot = await getDocs(q);
            const categories: Category[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as Category[];
            setCategories(categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

  return {
    categories
  }
}

export default useCategories




// import { collection, getDocs, orderBy, query } from "firebase/firestore";
// import type { Category } from "../types/types";
// import { db } from "../firebase";

// const q = query(
//     collection(db, "categories"),
//     orderBy("createdAt", "asc")
// )

// const useCategories = async (): Promise<Category[]> => {
//   try {
//     const snapshot = await getDocs(q);

//     const categories: Category[] = snapshot.docs.map((doc) => ({
//       id: doc.id,
//       ...doc.data(),
//     })) as Category[];

//     return categories;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return [];
//   }

//   return {};
// };

// export default useCategories;
