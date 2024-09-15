"use client";

export default function LogoutButton() {
  const logout = () => {
    document.cookie = "token=;  max-age=3600; path=/; SameSite=Strict";
    document.cookie = "username=;  max-age=3600 ;path=/; SameSite=Strict";
    document.cookie = "isLoggedIn=;  max-age=3600; path=/; SameSite=Strict";
    document.cookie = "userId=;  max-age=3600; path=/; SameSite=Strict";
    localStorage.removeItem("token");

    window.location.href = "/";
  };
  return <button onClick={logout}>Logout</button>;
}
