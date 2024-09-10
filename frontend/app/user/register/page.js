import AuthForm from "@/components/UserAuth/AuthForm";
import styles from "../user.module.css";

export default function RegisterPage() {
  return (
    <div className={styles.formContainer}>
      <AuthForm isLogin={false} />
    </div>
  );
}
