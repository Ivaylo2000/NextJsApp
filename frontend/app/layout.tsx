import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/MainHeader/main-header";
import { cookies } from "next/headers";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "My Next App",
  description: "My next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const isLoggedInCookie = cookieStore.get("isLoggedIn")?.value;
  const usernameCookie = cookieStore.get("username")?.value;

  const isLoggedIn = isLoggedInCookie === "true";
  const username = usernameCookie || "";

  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <MainHeader IsLoggedIn={isLoggedIn} username={username} />
        <div id="page">{children}</div>
      </body>
    </html>
  );
}
