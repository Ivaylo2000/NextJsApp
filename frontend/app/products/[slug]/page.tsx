import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { IProduct } from "@/interface/IProduct";
import AddToCart from "@/components/AddToCart/AddToCart";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value || "";
  const { slug } = params;
  let product: IProduct;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/${slug}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      const errorMessage = errorData?.message || "Failed to fetch product";

      toast.error(errorMessage);
    }
    const data = await response.json();
    product = data.product;
  } catch (err: unknown) {
    return notFound();
  }

  return (
    <article className={styles.product}>
      <header>
        <div className={styles.image}>
          {product.imageUrl && (
            <Image
              fill
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.imageUrl}`}
              alt={product.name}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </header>
      <div className={styles.productInformation}>
        <div className={styles.headerText}>
          <p>
            Category:
            <span className={styles.productSeller}> {product.category} </span>
          </p>
          <p>
            By:
            <span className={styles.productSeller}>
              <Link href={`/user/${product.username}/products`}>
                {product.username}
              </Link>
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

          <AddToCart product={product} userId={userId} />
        </div>
      </div>
    </article>
  );
}
