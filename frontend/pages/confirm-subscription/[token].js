// pages/confirm-subscription/[token].js
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
import { confirmSubscription } from "@/api.service";

export default function ConfirmationPage() {
  const router = useRouter();
  const { token } = router.query;
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  // Update the error handling in useEffect
  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Missing confirmation token");
      return;
    }

    const handleConfirmation = async () => {
      try {
        const result = await confirmSubscription(token);

        if (result.success) {
          setStatus("success");
          setMessage(
            "Email successfully confirmed! Thank you for subscribing."
          );
        } else {
          setStatus("error");
          setMessage(getErrorMessage(result.reason));
        }
      } catch (error) {
        setStatus("error");
        setMessage(getErrorMessage(error.message));
      }
    };

    handleConfirmation();
  }, [token]);

  // Add error message mapping function
  const getErrorMessage = (reason) => {
    const messages = {
      invalid_token: "Invalid confirmation link",
      expired: "Confirmation link has expired. Please request a new one.",
      server_error: "Server error. Please try again later.",
      invalid_token_format: "Invalid token format",
      confirmation_failed: "Confirmation failed. Please try again.",
    };

    return (
      messages[reason] || "An unexpected error occurred. Please try again."
    );
  };

  return (
    <div className="min-h-screen bg-[#23292f] text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center mb-8">
        {status === "loading" && (
          <>
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-[#ca0905] text-6xl mb-4 animate-spin"
            />
            <h1 className="text-4xl font-bold mb-4">Verifying Subscription</h1>
            <p className="text-gray-400 mb-6">
              Please wait while we confirm your email address
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 text-6xl mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">Subscription Confirmed!</h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-2 bg-[#ca0905] hover:bg-red-700 text-white font-semibold rounded transition"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Return to Homepage
            </Link>
          </>
        )}

        {status === "error" && (
          <>
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="text-[#ca0905] text-6xl mb-4"
            />
            <h1 className="text-4xl font-bold mb-4">Confirmation Failed</h1>
            <p className="text-gray-400 mb-6">{message}</p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/subscribe"
                className="inline-flex items-center px-6 py-2 bg-[#ca0905] hover:bg-red-700 text-white font-semibold rounded transition"
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Resend Confirmation
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

      <div className="max-w-md w-full">
        <img
          src={
            status === "success"
              ? "/success-illustration.svg"
              : "/error-illustration.svg"
          }
          alt="Confirmation Status"
          className="w-full h-auto object-contain opacity-75"
        />
      </div>
    </div>
  );
}
