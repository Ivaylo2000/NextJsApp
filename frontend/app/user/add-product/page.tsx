import AddProduct from "@/components/AddProduct/AddProduct";
import { cookies } from "next/headers";

export default function AddProductPage() {
  const cookieStore = cookies();
  const usernameCookie = cookieStore.get("username");
  const tokenCookie = cookieStore.get("token");
  const userIdCookie = cookieStore.get("userId");
  const username = usernameCookie?.value || null;
  const token = tokenCookie?.value || null;
  const userId = userIdCookie?.value || null;

  return <AddProduct username={username} token={token} userId={userId} />;
}
