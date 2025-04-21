// pages/unsubscribe/[email].js
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faSpinner,
  faArrowLeft,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { unsubscribeUser } from "@/api.service";

export default function UnsubscribePage() {
  const router = useRouter();
  const { email } = router.query;
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!email) {
      setStatus("error");
      setMessage("Missing email address");
      return;
    }

    // Update the handleUnsubscribe function
    const handleUnsubscribe = async () => {
      try {
        setStatus("loading");
        const result = await unsubscribeUser(email);

        // Handle API response
        if (result.success) {
          setStatus("success");
          setMessage(result.message);
        } else {
          setStatus("error");
          setMessage(
            result.reason === "not_found"
              ? "Email address not found in our system"
              : result.message
          );
        }
      } catch (error) {
        setStatus("error");
        setMessage(
          error.message.includes("not found")
            ? "Email address not found in our system"
            : error.message
        );
      }
    };

    handleUnsubscribe();
  }, [email]);

  return (
    <div className="min-h-screen bg-[#23292f] text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center mb-8">
        {status === "loading" && (
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-[#ca0905] text-6xl mb-4 animate-spin"
            />
            <h1 className="text-4xl font-bold mb-4">
              Processing Unsubscription
            </h1>
            <p className="text-gray-400 mb-6">
              Please wait while we process your request...
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-6xl mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">
              Unsubscribed Successfully
            </h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-2 bg-[#ca0905] hover:bg-red-700 text-white font-semibold rounded transition"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Return to Homepage
              </Link>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-[#ca0905] text-6xl mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">Unsubscription Failed</h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-6 py-2 bg-[#ca0905] hover:bg-red-700 text-white font-semibold rounded transition"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Contact Support
              </Link>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded transition"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                Back to Home
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
