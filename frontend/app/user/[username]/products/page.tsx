import { IProduct } from "@/interface/IProduct";
import styles from "../../../../shared/userProducts.module.css";
import CustomImage from "@/shared/Image";
export default async function UserProducts({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;

  let products: IProduct[] = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/user/${username}`
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
        <h1>{username} Products</h1>

        <ul className={styles.productsList}>
          {products.map((product) => (
            <li key={product._id} className={styles.product}>
              <header>
                <div className={styles.image}>
                  <CustomImage
                    src={`https://firebasestorage.googleapis.com/v0/b/imagestore-9b0d0.appspot.com/o/products%2F${product.imageUrl}?alt=media&token=8620166b-f4a4-4bd6-b68b-e0e580e688ba`}
                    alt={product.name}
                  />
                </div>
              </header>
              <div className={styles.productInformation}>
                <p className={styles.productName}>
                  Name:
                  <span> {product.name}</span>
                </p>

                <p className={styles.productPrice}>
                  Price: <span> {product.price} $</span>
                </p>
                <p className={styles.description}>
                  Description:
                  <span> {product.description}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
}
