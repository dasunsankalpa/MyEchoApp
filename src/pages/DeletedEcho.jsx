import { Link } from "react-router-dom";

export default function DeletedEcho() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl mb-6">
        🗑️
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
        This Echo was removed
      </h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        The person who created this memory deleted their account. The memory is
        no longer available, but the place remains.
      </p>
      <Link
        to="/"
        className="bg-gradient-to-br from-green-600 to-yellow-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-green-600/30"
      >
        Back to Explore
      </Link>
    </div>
  );
}