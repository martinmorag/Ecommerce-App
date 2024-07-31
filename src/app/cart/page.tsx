"use client";

import { useEffect, useState } from "react";
import { API_BASE_URL } from "@/lib/api";
import Card from "@/app/ui/cart/card";
import { CartItem } from "@/lib/definitions";
import styles from "./cart.module.css";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function Page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/cart`);

        if (!response.ok) {
          throw new Error("Failed to fetch items in cart");
        }

        const data = await response.json();
        setCartItems(data);
      } catch (error: any) {
        console.error("Error fetching cart items:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleIncrease = (itemId: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem._id === itemId
          ? {
              ...cartItem,
              quantity: cartItem.quantity + 1,
              totalPrice: (cartItem.quantity + 1) * cartItem.item.price,
            }
          : cartItem
      )
    );
  };

  const handleDecrease = (itemId: string) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem._id === itemId && cartItem.quantity > 1
          ? {
              ...cartItem,
              quantity: cartItem.quantity - 1,
              totalPrice: (cartItem.quantity - 1) * cartItem.item.price,
            }
          : cartItem
      )
    );
  };  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1 className={styles.cartTitle}>Your Cart <ShoppingCartIcon className={styles.cartIcon}/></h1>
      <div className={styles.cartContainer}>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div>
            {cartItems.map((cartItem) => (
              <Card
                key={cartItem._id}
                item={cartItem.item}
                quantity={cartItem.quantity}
                totalPrice={cartItem.totalPrice} // Pass totalPrice to Card
                onIncrease={() => handleIncrease(cartItem._id)}
                onDecrease={() => handleDecrease(cartItem._id)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}