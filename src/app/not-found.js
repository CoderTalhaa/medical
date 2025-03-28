import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-8 max-w-md w-full shadow-2xl backdrop-blur-sm">
        <div className="relative">
          <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500 mb-4">
            404
          </h1>
          <div className="absolute -top-2 -right-2 animate-ping w-4 h-4 bg-red-500 rounded-full"></div>
          <h2 className="text-2xl font-semibold text-gray-200 mb-3">
            Page Not Found
          </h2>
          <p className="text-gray-400 mb-6">
            Oops! The page youre looking for seems to have wandered off into the
            digital wilderness.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          <ArrowLeft className="w-5 h-5" />
          Return to Home
        </Link>
      </div>

      {/* Subtle background animation */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <div className="absolute w-64 h-64 bg-red-500/20 rounded-full blur-3xl animate-blob top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute w-64 h-64 bg-orange-500/20 rounded-full blur-3xl animate-blob animation-delay-2000 top-2/3 right-1/4 translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
}
