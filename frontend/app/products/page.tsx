import { IProduct } from "@/interface/IProduct";
import styles from "./page.module.css";
import Products from "@/components/Products/products";
export default async function ProductsPage() {
  let products: IProduct[] = [];
  let error: string | null = null;

  try {
    const response = await fetch("http://localhost:5000/products", {
      next: { revalidate: 10 },
    });
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
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  console.log(products);
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
          />
        ))}
      </ul>
    </main>
  );
}
