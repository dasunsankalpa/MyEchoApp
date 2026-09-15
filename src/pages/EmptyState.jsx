import { Link } from "react-router-dom";

export default function EmptyState() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-yellow-100 flex items-center justify-center text-5xl mb-6">
        🌫️
      </div>
      <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
        No Echoes nearby
      </h2>
      <p className="text-gray-500 text-sm mb-8 leading-relaxed">
        This place has no memories yet.
        <br />
        Be the first to leave one.
      </p>
      <Link
        to="/leave"
        className="bg-gradient-to-br from-green-600 to-yellow-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-green-600/30 active:scale-95 transition"
      >
        Leave the first Echo
      </Link>
      <Link to="/" className="mt-4 text-sm text-green-700 font-medium">
        ← Back to Explore
      </Link>
    </div>
  );
}