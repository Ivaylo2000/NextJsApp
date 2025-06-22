import { IProduct } from "@/interface/IProduct";
import styles from "../../../shared/userProducts.module.css";
import { cookies } from "next/headers";
import CustomImage from "@/shared/Image";
import DeleteProduct from "@/components/DeleteProduct/DeleteProduct";
import EditProduct from "@/components/EditProduct/EditProduct";

export default async function UserProducts() {
  const cookieStore = cookies();
  const userIdCookie = cookieStore.get("username")?.value;
  const username = userIdCookie || "";

  let products: IProduct[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/user/${username}`,
      { cache: "no-store" }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user products");
    }
    const data = await response.json();
    products = data.products;
  } catch (err) {}

  return (
    <>
      <article className={styles.userProducts}>
        <h1>Your Products</h1>

        <ul className={styles.productsList}>
          {products.map((product) => (
            <li key={product._id} className={styles.product}>
              <header>
                <div className={styles.image}>
                  <CustomImage
                    src={`${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_BASE_URL}${product.imageUrl}?alt=media&token=${process.env.NEXT_PUBLIC_FIREBASE_IMAGE_TOKEN}`}
                    alt={product.name}
                  />
                </div>
              </header>
              <div className={styles.productInformation}>
                <p className={styles.productName}>
                  Name:
                  <span> {product.name}</span>
                  <EditProduct product={product} />
                </p>

                <p className={styles.productPrice}>
                  Price: <span> {product.price} $</span>
                </p>

                <p className={styles.description}>
                  Description:
                  <span> {product.description}</span>
                </p>

                <DeleteProduct product={product} userId={username} />
              </div>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
