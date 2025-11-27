import { useEffect } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "../hooks/useUserContext";

export default function Index() {
  const router = useRouter();
  const { currentUser, isLoading } = useUserContext();

  useEffect(() => {
    if (!isLoading) {
      if (currentUser) {
        router.replace("/dashboard");
      } else {
        router.replace("/login");
      }
    }
  }, [currentUser, isLoading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}
