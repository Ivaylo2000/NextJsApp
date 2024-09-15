"use client";
import Link from "next/link";
import styles from "./auth-form.module.css";
import Button from "@/shared/Button";
import { useState } from "react";
import toast from "react-hot-toast";
export default function AuthForm({ isLogin }: { isLogin: boolean }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${
          isLogin ? "login" : "signup"
        }`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message);
        return;
      }

      const data = await response.json();
      const { token, username, userId } = data;
      if (data.errorMessage) {
        toast.error(data.errorMessage);
      }
      if (isLogin) {
        document.cookie = `isLoggedIn=true;  max-age=3600; path=/; SameSite=Strict`;
        document.cookie = `username=${username};  max-age=3600; path=/; SameSite=Strict`;
        document.cookie = `userId=${userId};  max-age=3600; path=/; SameSite=Strict`;
        localStorage.setItem("token", token);
        document.cookie = `token=${token};  max-age=3600; path=/`;

        window.location.href = "/";
      } else {
        toast.success("Registration successful! Please log in.");
      }
    } catch (error: unknown) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className={styles.formContainer}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <form className={styles["auth-form"]} onSubmit={handleSubmit}>
        <div className={styles["form-navigation"]}>
          <Link href="/user/login">Login</Link>
          <Link href="/user/register">Register</Link>
        </div>

        {!isLogin && (
          <div className={styles.inputContainer}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className={styles.inputContainer}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
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
