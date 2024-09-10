import styles from "./products.module.css";
import Image from "next/image";
import NavLink from "../MainHeader/nav-links";
import { IProduct } from "@/interface/IProduct";
export default function Products({
  imageUrl,
  name,
  description,
  price,
  _id,
  category,
}: IProduct) {
  return (
    <li key={_id}>
      <article className={styles.product}>
        <header>
          <div className={styles.image}>
            {imageUrl && (
              <Image
                fill
                src={
                  imageUrl.startsWith("https://")
                    ? imageUrl
                    : `http://localhost:5000${imageUrl}`
                }
                alt={name}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className={styles.headerText}>
            <h2>{name}</h2>
            <p>Category: {category} </p>
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
