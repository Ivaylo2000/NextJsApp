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
    <li className={styles.product} key={_id}>
      <article>
        <header>
          <div className={styles.image}>
            {imageUrl && (
              <Image
                fill
                src={`${process.env.NEXT_PUBLIC_API_URL}${imageUrl}`}
                alt={name}
                style={{ objectFit: "cover" }}
              />
            )}
          </div>
          <div className={styles.headerText}>
            <h2>
              Name: <span>{name}</span>
            </h2>
            <p>Category: {category}</p>
          </div>
        </header>
        <div className={styles.content}>
          <p className={styles.summary}>
            Description : <span>{description}</span>
          </p>
          <p className={styles.price}>
            Price: <span>{price} $</span>
          </p>
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
