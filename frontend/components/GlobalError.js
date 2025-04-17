// components/GlobalError.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function GlobalError({ message = "Something went wrong." }) {
  return (
    <div className="fixed inset-0 bg-[#23292f] text-white flex flex-col items-center justify-center z-[9999] px-4">
      <div className="max-w-xl text-center">
        <FontAwesomeIcon
          icon={faExclamationTriangle}
          className="text-[#ca0905] text-6xl mb-4"
        />
        <h1 className="text-3xl font-bold mb-4">Error Occurred</h1>
        <p className="text-gray-400 mb-6">{message}</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-2 bg-[#ca0905] hover:bg-red-700 text-white font-semibold rounded transition"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-md w-full mt-6">
        <img
          src="/404 Error-rafiki.svg"
          alt="Error Illustration"
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
}
