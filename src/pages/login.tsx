import React, { useEffect } from "react";
import { useRouter } from "next/router";
import LoginForm from "../components/LoginForm";
import { useUserContext } from "../hooks/useUserContext";
import { useDarkMode } from "../hooks/useDarkMode";

export default function LoginPage() {
  const { currentUser } = useUserContext();
  const { darkMode } = useDarkMode();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push("/dashboard");
    }
  }, [currentUser, router]);

  if (currentUser) {
    return null; // Or a loading spinner
  }

  return (
    <LoginForm
      darkMode={darkMode}
      onSuccess={() => router.push("/dashboard")}
    />
  );
}
