import Cart from "@/components/Cart/Cart";
import { cookies } from "next/headers";
export default function CartPage() {
  const cookieStore = cookies();
  const userIdCookie = cookieStore.get("userId")?.value;
  const userId = userIdCookie || "";

  return (
    <>
      <Cart userId={userId} />
    </>
  );
}
