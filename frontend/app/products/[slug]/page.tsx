import Link from "next/link";
import styles from "./page.module.css";
import { IProduct } from "@/interface/IProduct";
import AddToCart from "@/components/AddToCart/AddToCart";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import toast from "react-hot-toast";
import CustomImage from "@/shared/Image";
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
          <CustomImage
            src={`https://firebasestorage.googleapis.com/v0/b/imagestore-9b0d0.appspot.com/o/products%2F${product.imageUrl}?alt=media&token=8620166b-f4a4-4bd6-b68b-e0e580e688ba`}
            alt={product.name}
          />
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
