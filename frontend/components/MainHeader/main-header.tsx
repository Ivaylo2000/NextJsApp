import Link from "next/link";
import NavLink from "./nav-links";
import styles from "./header.module.css";
import Image from "next/image";
export default function MainHeader() {
  return (
    <header className={styles["main-header"]}>
      <div id={styles.logo}>
        <Link href="/">E-Commerce</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>{" "}
          <li>
            <NavLink href="/products">Products</NavLink>
          </li>
          <li>
            <NavLink href="/cart">
              <Image
                src="/icons/cartIcon.svg"
                alt="cartIcon"
                width={25}
                height={25}
              />
            </NavLink>
          </li>
          <li className={styles.dropdown}>
            <NavLink href="/user/login">
              <Image
                src="/icons/userIcon.svg"
                alt="cartIcon"
                width={25}
                height={25}
              />
            </NavLink>
            <div className={styles.dropdownMenu}>
              <ul>
                <li>
                  <NavLink href="/user/add-product">Add Product</NavLink>
                </li>
                {/* <li>
                  <NavLink href="/logout">Logout</NavLink>
                </li> */}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
