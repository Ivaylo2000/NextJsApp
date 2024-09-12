import styles from "./products.module.css";
import Image from "next/image";
import NavLink from "../MainHeader/nav-links";
import { IProduct } from "@/interface/IProduct";
//NAPRAVI PRODUCTS DA STAVA ZA PRODUCT I ZA
//PRODUCTS KATO IZMESTISH LI V PRODUCTPAGA
//ZAEDNO S NAVLINKA
export default function Products({
  imageUrl,
  name,
  description,
  price,
  _id,
  category,
}: IProduct) {
  const imageSrc = imageUrl.startsWith("http")
    ? imageUrl
    : `http://localhost:5000${
        imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`
      }`;
  return (
    <li className={styles.product} key={_id}>
      <article>
        <header>
          <div className={styles.image}>
            {imageUrl && (
              <Image
                fill
                src={imageSrc}
                alt={name}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className={styles.headerText}>
            <h2>{name}</h2>
            <p>Category: {category}</p>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.summary}>{description}</p>
          <p className={styles.price}>{price} $</p>
          <div className={styles.actions}>
            <NavLink href={`/products/${name.replaceAll(" ", "-")}`}>
              View Details
            </NavLink>
          </div>
        </div>
      </article>
    </li>
  );
}
