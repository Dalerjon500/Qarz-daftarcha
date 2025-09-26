import { db } from "../firebase"
import { collection, getDocs, doc, getDoc, QueryDocumentSnapshot, type DocumentData } from "firebase/firestore"
import { useState, useEffect, useCallback } from "react"
import type { Order, OrderProduct, User } from "../types/types"

async function fetchUser(userId: string): Promise<User | null> {
  try {
    const userSnap = await getDoc(doc(db, "users", userId))
    return userSnap.exists()
      ? ({ id: userSnap.id, ...userSnap.data() } as User)
      : null
  } catch (error) {
    console.warn(`User ${userId} not found:`, error)
    return null
  }
}

async function fetchOrderProducts(orderId: string): Promise<OrderProduct[]> {
  try {
    const productsSnap = await getDocs(collection(db, "orders", orderId, "orderProducts"))
    return productsSnap.docs.map(p => ({
      id: p.id,
      ...p.data(),
    })) as OrderProduct[]
  } catch (error) {
    console.warn(`Products for order ${orderId} not found:`, error)
    return []
  }
}

async function buildOrder(
  orderDoc: QueryDocumentSnapshot<DocumentData>
): Promise<Order> {
  const orderData = orderDoc.data()
  const orderId = orderDoc.id

  const [user, products] = await Promise.all([
    orderData.userId ? fetchUser(orderData.userId) : Promise.resolve(null),
    fetchOrderProducts(orderId),
  ])

  return {
    id: orderId,
    userId: orderData.userId,
    user: user as User,
    totalPrice: orderData.totalPrice || 0,
    products,
    createdAt: orderData.createdAt,
    status: orderData.status || "unknown",
    paymentMethod: orderData.paymentMethod || "unknown",
    shippingAddress: orderData.shippingAddress || "unknown",
    notes: orderData.notes || "unknown",
    deliveryDate: orderData.deliveryDate || "unknown",
  }
}

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const ordersSnap = await getDocs(collection(db, "orders"))
      const allOrders = await Promise.all(ordersSnap.docs.map(doc => buildOrder(doc)))

      setOrders(allOrders)
      console.log(`Jami ${allOrders.length} ta order topildi va arrayga joylandi`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  const getAllOrders = (): Order[] => orders

  const getOrdersByStatus = (status: string): Order[] =>
    orders.filter(order => order.status === status)

  const getOrdersByUser = (userId: string): Order[] =>
    orders.filter(order => order.userId === userId)

  return {
    orders,
    loading,
    error,
    refetch: fetchOrders,
    getAllOrders,
    getOrdersByStatus,
    getOrdersByUser,
  }
}
