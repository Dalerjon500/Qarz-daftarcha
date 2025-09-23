import { useEffect, useState } from "react";
import type { CarouselItem } from "../types/types";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

function useCarousel() {
    const [carousel, setCarousel] = useState<CarouselItem[]>([]);

    const q = query(
        collection(db, "carousel"),
        orderBy("createdAt", "asc")
    )

    useEffect(() => {
        getCarousel();
    }, [])

    const getCarousel = async () => {
        try {
            const snapshot = await getDocs(q);
            const carouselItems: CarouselItem[] = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as CarouselItem[];
            setCarousel(carouselItems);
        } catch (error) {
            console.error("Error fetching carousel items:", error);
        }
    }
  return { carousel }
}

export default useCarousel

