"use client";
import { IProduct } from "@/interface/IProduct";
import Button from "@/shared/Button";
import { useRouter } from "next/navigation";

export default function DeleteProduct({
  product,
  userId,
}: {
  product: IProduct;
  userId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${product._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userId}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      await response.json();
      router.refresh();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  return <Button onClick={handleDelete}>Delete Product</Button>;
}
