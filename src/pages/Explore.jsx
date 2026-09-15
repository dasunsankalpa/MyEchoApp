import { useState } from "react";
import { Link } from "react-router-dom";
import { echoes } from "../data/echoes";
import { landmarks } from "../data/landmarks";
import SmartImage from "../components/SmartImage";

export default function Explore() {
  const [openLandmark, setOpenLandmark] = useState(null);

  const activeLandmark = landmarks.find((l) => l.id === openLandmark);

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="px-6 pt-14 pb-10 bg-gradient-to-br from-green-600 via-emerald-500 to-yellow-400 rounded-b-[40px] text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute top-20 -left-10 w-32 h-32 bg-yellow-300/40 rounded-full blur-2xl" />

        <div className="relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-green-50 text-sm font-medium">
                Good evening 👋
              </p>
              <h1 className="text-3xl font-extrabold mt-1 tracking-tight">
                Echoes near you
              </h1>
            </div>
            <Link
              to="/notifications"
              className="w-11 h-11 rounded-full bg-white/25 backdrop-blur flex items-center justify-center text-lg relative"
            >
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 bg-yellow-300 rounded-full" />
            </Link>
          </div>

          <div className="flex items-center gap-2 mt-4 text-sm text-green-50">
            <span className="w-2 h-2 bg-yellow-300 rounded-full animate-pulse" />
            <span>Vavuniya · {landmarks.length} special places</span>
          </div>
        </div>
      </div>

      {/* ===== SPECIAL PLACES BUTTONS ===== */}
      <div className="px-5 -mt-6 relative">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {landmarks.map((l) => {
            const active = openLandmark === l.id;
            return (
              <button
                key={l.id}
                onClick={() => setOpenLandmark(active ? null : l.id)}
                className={`flex-shrink-0 rounded-2xl px-4 py-3 shadow-[0_8px_30px_rgba(22,163,74,0.1)] border transition-all active:scale-95 flex items-center gap-2 ${
                  active
                    ? "bg-gradient-to-br from-green-600 to-yellow-400 border-transparent text-white"
                    : "bg-white border-green-100/60 text-gray-700"
                }`}
              >
                <span className="text-base">{l.emoji}</span>
                <span className="text-xs font-bold whitespace-nowrap">
                  {l.name}
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                    active
                      ? "bg-white/25 text-white"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {l.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ===== EXPANDED LANDMARK MEMORIES ===== */}
      {activeLandmark && (
        <div className="px-5 mt-4 animate-fade-in">
          <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-3xl border border-green-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-2xl shadow-md">
                  {activeLandmark.emoji}
                </div>
                <div>
                  <h2 className="font-extrabold text-gray-900 text-base">
                    {activeLandmark.name}
                  </h2>
                  <p className="text-xs text-green-700 font-semibold">
                    {activeLandmark.count} memories at this place
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpenLandmark(null)}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-500 text-sm shadow-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              {activeLandmark.memories.map((m) => (
                <div
                  key={m.id}
                  className="bg-white rounded-2xl p-4 border border-green-100/60 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {m.avatar ? (
                      <img
                        src={m.avatar}
                        alt={m.author}
                        className="w-8 h-8 rounded-full object-cover border border-green-200"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-white font-bold text-xs">
                        {m.author[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900">
                        {m.author}
                      </p>
                      <p className="text-[10px] text-gray-400">{m.date}</p>
                    </div>
                    <span className="text-[10px] text-gray-400">
                      ❤️ {m.reactions}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-gray-900">{m.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 leading-snug">
                    {m.memory}
                  </p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 bg-gradient-to-br from-green-600 to-yellow-400 text-white py-3 rounded-2xl font-bold text-sm shadow-md shadow-green-600/30 active:scale-95 transition">
              View all {activeLandmark.count} memories →
            </button>
          </div>
        </div>
      )}

      {/* ===== REGULAR ECHOES ===== */}
      <div className="px-5 mt-6 mb-3">
        <h2 className="text-base font-extrabold text-gray-900">
          📍 Latest Echoes nearby
        </h2>
        <p className="text-xs text-gray-400 mt-0.5">
          Individual memories around you
        </p>
      </div>

      <div className="px-5 space-y-4">
        {echoes.map((e) => (
          <Link key={e.id} to={`/echo/${e.id}`}>
            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(22,163,74,0.1)] border border-green-100/60 active:scale-[0.98] transition-all overflow-hidden">
              <div className="flex">
                <SmartImage
                  src={e.image}
                  alt={e.title}
                  className="w-28 flex-shrink-0 h-auto min-h-[128px]"
                  fallback="📍"
                />
                <div className="flex-1 p-4 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {e.avatar ? (
                      <img
                        src={e.avatar}
                        alt={e.author}
                        className="w-7 h-7 rounded-full object-cover border border-green-200"
                      />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-white font-bold text-[10px]">
                        {e.author[0]}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 truncate">
                        {e.author}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        {e.date} · {e.distance}
                      </p>
                    </div>
                    {e.isMine && (
                      <span className="text-[9px] bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-bold uppercase">
                        Yours
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-gray-900 text-sm leading-tight line-clamp-1">
                    {e.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-snug">
                    {e.memory}
                  </p>

                  <div className="flex items-center justify-between mt-2 text-[10px]">
                    <span className="text-green-700 font-medium truncate">
                      📍 {e.place}
                    </span>
                    <span className="text-gray-400 flex-shrink-0">
                      ❤️ {e.reactions}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* fade-in animation */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.25s ease-out; }
      `}</style>
    </div>
  );
}