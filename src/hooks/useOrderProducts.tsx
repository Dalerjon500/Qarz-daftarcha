import { useEffect, useState } from "react";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; 
import type { OrderProduct } from "../types/types";

function useOrderProducts() {
  const [allProducts, setAllProducts] = useState<OrderProduct[]>([]);
  const [groupedProducts, setGroupedProducts] = useState<OrderProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const getAllOrderProducts = async () => {
    try {
      const ordersRef = collection(db, "orders");
      const ordersSnapshot = await getDocs(ordersRef);

      let products: OrderProduct[] = [];

      for (const orderDoc of ordersSnapshot.docs) {
        const productsRef = collection(db, "orders", orderDoc.id, "orderProducts");
        const productsSnapshot = await getDocs(productsRef);

        const productsData: OrderProduct[] = productsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as OrderProduct[];

        products = [...products, ...productsData];
      }

      setAllProducts(products);
      return products;
    } catch (error) {
      console.error("Error fetching all order products:", error);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "orders"), () => {
      getAllOrderProducts();
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const productMap: { [key: string]: OrderProduct } = {};

    allProducts.forEach((product) => {
      if (!productMap[product.name]) {
        productMap[product.name] = { ...product };
      } else {
        productMap[product.name].quantity += product.quantity;
        productMap[product.name].price += product.price;
      }
    });

    setGroupedProducts(Object.values(productMap));
  }, [allProducts]);

  return { allProducts, groupedProducts, loading };
}

export default useOrderProducts;