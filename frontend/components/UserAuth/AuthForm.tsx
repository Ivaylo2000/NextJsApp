import Link from "next/link";
import styles from "./auth-form.module.css";
import FormField from "@/shared/FormField";
import Button from "@/shared/Button";
export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  return (
    <div className={styles.formContainer}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form className={styles["auth-form"]}>
        <div className={styles["form-navigation"]}>
          <Link href="/user/login">Login</Link>
          <Link href="/user/register">Register</Link>
        </div>

        {!isLogin && (
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input type="text" id="email" name="email" required />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <p className={styles.actions}>
          <Button className={styles.formButton} type="submit">
            {isLogin ? "Login" : "Register"}
          </Button>
        </p>
      </form>
    </div>
  );
}
