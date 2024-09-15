import AuthForm from "@/components/UserAuth/AuthForm";
import styles from "../user.module.css";
export default function LoginPage() {
  return (
    <div className={styles.formContainer}>
      <AuthForm isLogin={true} />
    </div>
  );
}
