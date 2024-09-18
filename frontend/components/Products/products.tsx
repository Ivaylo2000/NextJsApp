import styles from "./products.module.css";
import NavLink from "../MainHeader/nav-links";
import { IProduct } from "@/interface/IProduct";
import CustomImage from "@/shared/Image";
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
            <CustomImage
              src={`https://firebasestorage.googleapis.com/v0/b/imagestore-9b0d0.appspot.com/o/products%2F${imageUrl}?alt=media&token=8620166b-f4a4-4bd6-b68b-e0e580e688ba`}
              alt={name}
            />
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
