// components/withAuth.js
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth";

export const withAuth = (Component) => {
  return function ProtectedRoute(props) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !isAuthenticated) {
        router.push("/admin");
      }
    }, [isAuthenticated, isLoading, router]);

    if (isLoading || !isAuthenticated) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      );
    }

    return <Component {...props} />;
  };
};
