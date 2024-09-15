"use client";
import { useEffect, useState } from "react";
import { ICart } from "@/interface/ICart";
import Button from "@/shared/Button";
import styles from "./Cart.module.css";
import Image from "next/image";

interface CartProps {
  userId: string;
}

export default function Cart({ userId }: CartProps) {
  const [cartItems, setCartItems] = useState<ICart[]>([]);

  useEffect(() => {
    const loadCartItems = () => {
      const cartKey = `cart_${userId}`;
      const storedCart = localStorage.getItem(cartKey);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    };

    if (userId) {
      loadCartItems();
    }
  }, [userId]);

  const updateCart = (updatedItems: ICart[]) => {
    setCartItems(updatedItems);
    localStorage.setItem(`cart_${userId}`, JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (id: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const handleIncreaseQuantity = (id: string) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedCart);
  };

  const handleDecreaseQuantity = (id: string) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    updateCart(updatedCart);
  };

  return (
    <article className={styles.cart}>
      <h1>Your Cart {cartItems.length === 0 ? "is empty" : ""}</h1>

      <ul className={styles.cartList}>
        {cartItems.map((item) => (
          <li key={item.id} className={styles.product}>
            <header>
              <div className={styles.image}>
                <Image
                  fill
                  src={`${process.env.NEXT_PUBLIC_API_URL}${item.imageUrl}`}
                  alt={item.name}
                />
              </div>
            </header>
            <div className={styles.productInformation}>
              <span className={styles.itemName}>{item.name}</span>
              <div className={styles.quantityControls}>
                <Button onClick={() => handleDecreaseQuantity(item.id)}>
                  -
                </Button>
                <input
                  className={styles.itemsQuantity}
                  value={item.quantity}
                  disabled
                />
                <Button onClick={() => handleIncreaseQuantity(item.id)}>
                  +
                </Button>
              </div>
              <span className={styles.itemPrice}>
                Item Price: {item.price} $
              </span>
              <span className={styles.itemPrice}>
                Total Price: {(+item.price * item.quantity).toFixed(2)} $
              </span>
              <Button
                className={styles.removeButton}
                onClick={() => handleRemoveItem(item.id)}
              >
                Remove
              </Button>
            </div>
          </li>
        ))}
      </ul>
      {cartItems.length > 0 && (
        <Button onClick={() => localStorage.removeItem(`cart_${userId}`)}>
          Clear Cart
        </Button>
      )}
    </article>
  );
}
