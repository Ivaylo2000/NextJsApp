"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import styles from "./header.module.css";
type NavLinkProps = {
  href: string;
  children: ReactNode;
};

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();

  return (
    <Link
      href={href}
      className={path.startsWith(href) ? styles.active : undefined}
    >
      {children}
    </Link>
  );
}
