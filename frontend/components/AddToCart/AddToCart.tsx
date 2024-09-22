"use client";
import Button from "@/shared/Button";
import styles from "./AddToCart.module.css";
import { IProduct } from "@/interface/IProduct";
import { useState } from "react";
import { ICart } from "@/interface/ICart";
import toast from "react-hot-toast";
interface AddToCartProps {
  product: IProduct;
  userId: string | null;
}

export default function AddToCart({ product, userId }: AddToCartProps) {
  const [quantity, setQuantity] = useState<number>(1);

  const handleAddToCart = () => {
    if (!userId) {
      toast.error("You need to be logged in to add items to the cart.");
      return;
    }

    const cartKey = `cart_${userId}`;
    const cart: ICart[] = JSON.parse(localStorage.getItem(cartKey) || "[]");

    const existingItemIndex = cart.findIndex((item) => item.id === product._id);

    if (existingItemIndex !== -1) {
      cart[existingItemIndex].quantity += quantity;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity,
        username: userId,
      });
    }

    localStorage.setItem(cartKey, JSON.stringify(cart));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div className={styles.actions}>
      <div className={styles.quantitySelector}>
        <Button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
          -
        </Button>
        <input disabled min={1} value={quantity} type="number" />
        <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
      </div>
      <div className={styles.addToCart}>
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </div>
    </div>
  );
}
