import { IProduct } from "@/interface/IProduct";
import styles from "./page.module.css";
import Products from "@/components/Products/products";
import toast from "react-hot-toast";

export default async function ProductsPage() {
  let products: IProduct[] = [];
  let error: string | null = null;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products`,
      {
        next: { revalidate: 5 },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    if (data.products && Array.isArray(data.products)) {
      products = data.products;
    } else {
      throw new Error(
        "Data fetched is not an array or does not contain products"
      );
    }
  } catch (err) {
    error = (err as Error).message;
    toast.error(error);
  }
  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <main className={styles.main}>
      <ul className={styles.products}>
        {products.map((product: IProduct) => (
          <Products
            key={product._id}
            _id={product._id}
            category={product.category}
            imageUrl={product.imageUrl}
            name={product.name}
            description={product.description}
            price={product.price}
            username={product.username}
            userId={product.userId}
          />
        ))}
      </ul>
    </main>
  );
}
