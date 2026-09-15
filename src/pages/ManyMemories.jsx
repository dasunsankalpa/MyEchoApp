import { Link } from "react-router-dom";
import { manyEchoes } from "../data/echoes";

export default function ManyMemories() {
  return (
    <div className="pb-32">
      <div className="px-6 pt-14 pb-6">
        <Link to="/" className="text-sm text-green-700 font-medium">
          ← Back
        </Link>
        <h1 className="text-2xl font-extrabold text-gray-900 mt-3 tracking-tight">
          📍 Vavuniya Clock Tower
        </h1>
        <p className="text-gray-400 text-sm mt-1">200 memories at this place</p>
      </div>

      <div className="px-5 flex gap-2 overflow-x-auto pb-3">
        {["All", "Recent", "Popular", "Near me", "Mine"].map((f, i) => (
          <button
            key={f}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold ${
              i === 0
                ? "bg-gradient-to-br from-green-600 to-yellow-400 text-white"
                : "bg-white border border-gray-200 text-gray-600"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="px-5 space-y-2">
        {manyEchoes.slice(0, 30).map((e) => (
          <div
            key={e.id}
            className="bg-white rounded-2xl p-3.5 border border-gray-100 flex gap-3"
          >
            <div className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
              {e.avatar ? (
                <img
                  src={e.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-green-500 to-yellow-400 flex items-center justify-center text-white font-bold text-xs">
                  {e.author[0]}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">{e.title}</p>
              <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                {e.memory}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                {e.author} · ❤️ {e.reactions}
              </p>
            </div>
          </div>
        ))}
        <p className="text-center text-xs text-gray-400 py-4">
          Showing 30 of 200 · Scroll to load more
        </p>
      </div>
    </div>
  );
}