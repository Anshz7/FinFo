// pages/_app.js
import "../styles/globals.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalLoader from "@/components/GlobalLoader";
import GlobalError from "@/components/GlobalError";
import { useEffect, useState } from "react";
import { AuthProvider } from "../context/auth";

function MyApp({ Component, pageProps }) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleError = (event) => {
      console.error("Global Error:", event?.error || event?.reason);
      setHasError(true);
      setErrorMessage(
        event?.reason?.message || "An unexpected error occurred."
      );
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  return (
    <AuthProvider>
      <GlobalLoader />
      {hasError ? (
        <GlobalError message={errorMessage} />
      ) : (
        <div className="bg-gray-50">
          <Navbar />
          <main className="min-h-screen">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      )}
    </AuthProvider>
  );
}

export default MyApp;
