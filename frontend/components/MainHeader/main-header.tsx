import Link from "next/link";
import NavLink from "./nav-links";
import styles from "./header.module.css";
import Image from "next/image";
import LogoutButton from "../LogoutButton/LogoutButton";

interface MainHeaderProps {
  username: string;
  IsLoggedIn: boolean;
}
export default function MainHeader({ username, IsLoggedIn }: MainHeaderProps) {
  return (
    <header className={styles["main-header"]}>
      <div id={styles.logo}>
        <Link href="/">Hello{username ? `, ${username}` : ""}</Link>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
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
            <p style={{ cursor: "pointer" }}>
              <Image
                src="/icons/userIcon.svg"
                alt="cartIcon"
                width={25}
                height={25}
              />
            </p>
            <div className={styles.dropdownMenu}>
              <ul>
                {IsLoggedIn ? (
                  <div className={styles.dropdownMenu}>
                    <ul>
                      <li>
                        <NavLink href="/user/add-product">Add Product</NavLink>
                      </li>
                      <li>
                        <NavLink href="/user/my-products">My Products</NavLink>
                      </li>
                      <li>
                        <LogoutButton />
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className={styles.dropdownMenu}>
                    <ul>
                      <li>
                        <NavLink href="/user/login">Login</NavLink>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}
