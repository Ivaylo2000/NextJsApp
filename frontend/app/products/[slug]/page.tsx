import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { IProduct } from "@/interface/IProduct";
import Button from "@/shared/Button";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  let product: IProduct;

  try {
    const response = await fetch(`http://localhost:5000/products/${slug}`);

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || "Failed to fetch product";

      throw new Error(errorMessage);
    }
    const data = await response.json();
    product = data.product;
    console.log(data.product);
  } catch (err: any) {
    console.log(err);
    return <div>Error: {err.message}</div>;
  }
  console.log(product);

  return (
    <article className={styles.product}>
      <header>
        <div className={styles.image}>
          {product.imageUrl && (
            <Image
              fill
              src={
                product.imageUrl.startsWith("https://")
                  ? product.imageUrl
                  : `http://localhost:5000${product.imageUrl}`
              }
              alt={product.name}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </header>
      <div className={styles.productInformation}>
        <div className={styles.headerText}>
          <p>Category: {product.category} </p>
          <p>
            By:
            <span className={styles.productSeller}>
              {/* tuk e linka kum usera koito e kachil obqvata */}
              <Link href="vjhig"> {product._id}</Link>
            </span>
          </p>

          <h2>{product.name}</h2>
        </div>
        <div className={styles.content}>
          <p className={styles.summary}>
            Description:
            <span className={styles.description}>{product.description}</span>
          </p>
          <p className={styles.price}>
            Price: <span>{product.price} $</span>
          </p>

          <div className={styles.actions}>
            <div className={styles.quantitySelector}>
              <Button>-</Button>
              <input disabled min={1} defaultValue={1} type="number" />
              <Button>+</Button>
            </div>
            <div className={styles.addToCart}>
              <Button>Add to cart</Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
