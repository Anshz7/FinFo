// pages/_app.js

import "../styles/globals.css";

// 1. Import the Font Awesome core
import { config } from "@fortawesome/fontawesome-svg-core";
// 2. Import the Font Awesome CSS
import "@fortawesome/fontawesome-svg-core/styles.css";
// 3. Tell Font Awesome to skip adding the CSS automatically
config.autoAddCss = false;

// Import your layout components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlobalLoader from "@/components/GlobalLoader";
import GlobalError from "@/components/GlobalError";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const handleError = (event) => {
      console.error("Global Error:", event?.error || event?.reason);
      setHasError(true);
      setErrorMessage(event?.reason?.message || "An unexpected error occurred.");
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleError);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleError);
    };
  }, []);

  return (
    <>
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
    </>
  );
}

export default MyApp;
