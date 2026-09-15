import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { echoes } from "../data/echoes";
import ReportSheet from "../components/ReportSheet";
import SmartImage from "../components/SmartImage";

export default function EchoDetail() {
  const { id } = useParams();
  const echo = echoes.find((e) => e.id === Number(id));
  const [reacted, setReacted] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!echo) return <p className="p-6">Echo not found.</p>;

  return (
    <div className="pb-32">
      {/* Hero with real image */}
      <div className="relative h-72 rounded-b-[40px] overflow-hidden">
        <SmartImage
          src={echo.image}
          alt={echo.place}
          className="absolute inset-0 w-full h-full"
          fallback="📍"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

        <Link
          to="/"
          className="absolute top-6 left-6 w-10 h-10 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white text-lg active:scale-95"
        >
          ←
        </Link>

        <div className="absolute top-6 right-6 flex gap-2">
          <button
            onClick={() => setSaved(!saved)}
            className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center text-lg active:scale-95 ${
              saved ? "bg-white text-green-700" : "bg-white/25 text-white"
            }`}
          >
            {saved ? "🔖" : "🏷️"}
          </button>
          <button
            onClick={() => setReportOpen(true)}
            className="w-10 h-10 bg-white/25 backdrop-blur-md rounded-full flex items-center justify-center text-white text-base active:scale-95"
          >
            ⋯
          </button>
        </div>

        <div className="absolute bottom-8 left-6 right-6 text-white">
          <p className="text-xs uppercase tracking-widest opacity-80 font-semibold">
            Memory at
          </p>
          <h1 className="text-2xl font-extrabold mt-1 drop-shadow-lg">
            📍 {echo.place}
          </h1>
        </div>
      </div>

      {echo.placeClosed && (
        <div className="mx-5 -mt-4 relative z-10 bg-amber-50 border border-amber-200 text-amber-800 text-sm p-4 rounded-2xl flex gap-3 shadow-sm">
          <span className="text-lg">⚠️</span>
          <span className="leading-snug">
            This place no longer exists. This memory is preserved here.
          </span>
        </div>
      )}

      {/* Memory Card */}
      <div className="px-5 mt-6">
        <div className="bg-white rounded-3xl p-6 shadow-[0_8px_30px_rgba(22,163,74,0.1)] border border-green-100/60">
          <div className="flex items-center gap-3 mb-5">
            {echo.avatar ? (
              <img
                src={echo.avatar}
                alt={echo.author}
                className="w-12 h-12 rounded-full object-cover border-2 border-green-100 shadow-md"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-white font-bold shadow-md">
                {echo.author[0]}
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{echo.author}</p>
              <p className="text-xs text-gray-400">
                {echo.date} · {echo.visibility}
              </p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-3">
            {echo.title}
          </h2>
          <p className="text-gray-600 leading-relaxed">{echo.memory}</p>

          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={() => setReacted(!reacted)}
              className={`flex-1 py-3 rounded-2xl font-semibold text-sm transition-all active:scale-95 ${
                reacted
                  ? "bg-gradient-to-br from-green-600 to-yellow-400 text-white shadow-md"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {reacted ? "❤️ Reacted" : "🤍 React"}
            </button>
            <button className="flex-1 bg-green-50 text-green-700 py-3 rounded-2xl font-semibold text-sm active:scale-95 transition">
              💬 Reply
            </button>
          </div>
        </div>

        <div className="mt-5 bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl p-5 border border-green-100">
          <p className="text-xs uppercase tracking-widest text-green-700 font-bold mb-2">
            Why here?
          </p>
          <p className="text-sm text-green-900 leading-relaxed">
            This memory is tied to this exact location. It appeared when you
            came within 30m of it.
          </p>
        </div>

        <Link
          to="/leave"
          className="block mt-5 bg-white rounded-3xl p-5 border border-dashed border-green-300 text-center active:scale-95 transition"
        >
          <p className="text-sm text-green-700 font-bold">
            ✍️ Leave your own Echo here
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Add a memory connected to this place
          </p>
        </Link>
      </div>

      <ReportSheet
        open={reportOpen}
        onClose={() => setReportOpen(false)}
        echoTitle={echo.title}
      />
    </div>
  );
}