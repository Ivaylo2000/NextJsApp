import Link from "next/link";
import styles from "./page.module.css";

export default function NotFound() {
  return (
    <div className={styles.header} style={{ alignItems: "center" }}>
      <h1>
        Page was <span className={styles.highlight}>Not Found!</span>{" "}
      </h1>
      <p className={styles.cta}>
        <Link href="/">Back to Home page</Link>
      </p>
    </div>
  );
}
