import type { Metadata } from "next";
import "./globals.css";
import MainHeader from "@/components/MainHeader/main-header";

export const metadata: Metadata = {
  title: "My Next App",
  description: "My next.js application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="page">
          <MainHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
