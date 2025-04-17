// pages/404.js
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

export default function Custom404() {
  return (
    <div className="min-h-screen bg-[#23292f] text-white flex flex-col items-center justify-center px-4">
      <div className="max-w-xl text-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-[#ca0905] text-6xl mb-4"
        />
        <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
        <p className="text-gray-400 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-2 bg-[#ca0905] hover:bg-red-700 text-white font-semibold rounded transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full">
        <img
          src="404 Error-rafiki.svg"
          alt="Not Found Illustration"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
