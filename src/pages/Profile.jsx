import { useState } from "react";
import { Link } from "react-router-dom";
import DeleteAccountSheet from "../components/DeleteAccountSheet";

export default function Profile() {
  const [deleteOpen, setDeleteOpen] = useState(false);

  const settings = [
    { icon: "📍", label: "Location accuracy", value: "Exact" },
    { icon: "🔔", label: "Proximity alerts", value: "On" },
    { icon: "👥", label: "Who can see my Echoes", value: "Public" },
    { icon: "🌐", label: "Language", value: "English" },
    { icon: "🛡️", label: "Blocked users", value: "3" },
    { icon: "❓", label: "Help & support", value: "" },
  ];

  return (
    <div className="pb-32">
      {/* Header */}
      <div className="px-6 pt-14 pb-10 bg-gradient-to-br from-green-600 via-emerald-500 to-yellow-400 rounded-b-[40px] text-white relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />

        <div className="relative flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80"
            alt="You"
            className="w-16 h-16 rounded-full object-cover border-2 border-white/50"
          />
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight">
              Dasun Perera
            </h1>
            <p className="text-green-50 text-sm mt-0.5">@dasun</p>
          </div>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-3 mt-6">
          <div className="bg-white/20 backdrop-blur rounded-2xl p-3 text-center">
            <p className="text-2xl font-extrabold">12</p>
            <p className="text-[10px] uppercase tracking-wide opacity-90">
              Echoes left
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-3 text-center">
            <p className="text-2xl font-extrabold">340</p>
            <p className="text-[10px] uppercase tracking-wide opacity-90">
              Reactions
            </p>
          </div>
          <div className="bg-white/20 backdrop-blur rounded-2xl p-3 text-center">
            <p className="text-2xl font-extrabold">28</p>
            <p className="text-[10px] uppercase tracking-wide opacity-90">
              Places
            </p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="px-5 mt-6">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3 px-1">
          Settings
        </p>
        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(22,163,74,0.08)] border border-green-100/60 overflow-hidden">
          {settings.map((s, i) => (
            <button
              key={s.label}
              className={`w-full flex items-center justify-between p-4 active:bg-green-50 transition text-left ${
                i !== settings.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-lg">{s.icon}</span>
                <span className="text-sm font-medium text-gray-800">
                  {s.label}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                {s.value && <span>{s.value}</span>}
                <span>›</span>
              </div>
            </button>
          ))}
        </div>

        {/* My Echoes */}
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-6 mb-3 px-1">
          My Echoes
        </p>
        <Link
          to="/many"
          className="bg-white rounded-3xl shadow-[0_8px_30px_rgba(22,163,74,0.08)] border border-green-100/60 p-4 flex items-center justify-between active:scale-[0.98] transition"
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">📖</span>
            <span className="text-sm font-medium text-gray-800">
              View all my Echoes
            </span>
          </div>
          <span className="text-gray-400">›</span>
        </Link>

        {/* Danger zone */}
        <p className="text-xs font-bold text-red-500 uppercase tracking-widest mt-8 mb-3 px-1">
          Danger zone
        </p>
        <div className="bg-red-50 rounded-3xl border border-red-200 overflow-hidden">
          <button
            onClick={() => setDeleteOpen(true)}
            className="w-full flex items-center justify-between p-4 active:bg-red-100 transition text-left"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg">🗑️</span>
              <div>
                <p className="text-sm font-semibold text-red-700">
                  Delete my account
                </p>
                <p className="text-xs text-red-400 mt-0.5">
                  Permanently remove your account and Echoes
                </p>
              </div>
            </div>
            <span className="text-red-400">›</span>
          </button>
        </div>

        <p className="text-center text-[10px] text-gray-300 mt-6">
          Echoes v1.0 · Made with 💚 in Sri Lanka
        </p>
      </div>

      <DeleteAccountSheet
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
      />
    </div>
  );
}