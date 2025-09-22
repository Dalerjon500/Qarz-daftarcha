import { collection, getDocs, orderBy, query } from "firebase/firestore";
import type { CarouselItem } from "../types/types";
import { db } from "../firebase";

const q = query(
    collection(db, "carousel"),
    orderBy("createdAt", "asc")
)

export const getCarousel = async (): Promise<CarouselItem[]> => {
  try {
    const snapshot = await getDocs(q);

    const carouselItems: CarouselItem[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as CarouselItem[];

    return carouselItems;
  } catch (error) {
    console.error("Error fetching carousel items:", error);
    return [];
  }
};
