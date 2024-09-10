import styles from "./page.module.css";
import Link from "next/link";
export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1>
          Shop the Best,
          <span className={styles.highlight}> Forget the Rest!</span>
        </h1>
        <p>Choose your favorite products and add it to your cart</p>
        <p className={styles.cta}>
          <Link href="/products">Explore Our Products</Link>
        </p>
      </header>
    </>
  );
}
