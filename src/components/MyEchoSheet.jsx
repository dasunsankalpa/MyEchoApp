import { useState } from "react";

export default function MyEchoSheet({ open, echo, onClose, onDelete, onPrivacyChange }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [privacy, setPrivacy] = useState(echo?.privacy || "public");

  if (!open || !echo) return null;

  const privacyOptions = [
    { id: "public", label: "Public", icon: "🌍" },
    { id: "friends", label: "Friends", icon: "👥" },
    { id: "onlyme", label: "Only me", icon: "🔒" },
  ];

  const handlePrivacy = (id) => {
    setPrivacy(id);
    onPrivacyChange(echo.id, id);
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => {
          setConfirmDelete(false);
          onClose();
        }}
      />
      <div className="relative w-full max-w-[430px] bg-white rounded-t-[32px] p-6 pb-8 animate-slide-up max-h-[85vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        {!confirmDelete ? (
          <>
            <h3 className="text-lg font-extrabold text-gray-900">
              Your Echo
            </h3>
            <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">
              {echo.title}
            </p>

            {/* Privacy */}
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-5 mb-2">
              Privacy
            </p>
            <div className="grid grid-cols-3 gap-2">
              {privacyOptions.map((o) => (
                <button
                  key={o.id}
                  onClick={() => handlePrivacy(o.id)}
                  className={`p-3 rounded-2xl text-center transition border ${
                    privacy === o.id
                      ? "bg-yellow-100 border-yellow-300"
                      : "bg-white border-gray-100"
                  }`}
                >
                  <div className="text-xl mb-1">{o.icon}</div>
                  <p className="text-xs font-bold text-gray-800">{o.label}</p>
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">
              {privacy === "public" && "Anyone nearby can see this Echo"}
              {privacy === "friends" && "Only people you follow can see this"}
              {privacy === "onlyme" && "Only you can see this — private diary"}
            </p>

            {/* Actions */}
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-full mt-5 py-3.5 rounded-2xl bg-red-50 text-red-700 font-bold text-sm border border-red-200 active:scale-95 transition flex items-center justify-center gap-2"
            >
              🗑️ Delete this Echo
            </button>

            <button
              onClick={onClose}
              className="w-full mt-2 text-gray-500 py-2 text-sm font-medium"
            >
              Close
            </button>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-3xl mx-auto mb-4">
              ⚠️
            </div>
            <h3 className="text-lg font-extrabold text-gray-900 text-center">
              Delete this Echo?
            </h3>
            <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
              This memory will be removed from the map forever. This cannot be
              undone.
            </p>

            <button
              onClick={() => {
                onDelete(echo.id);
                setConfirmDelete(false);
                onClose();
              }}
              className="w-full mt-6 bg-red-600 text-white py-3.5 rounded-2xl font-bold active:scale-95 transition"
            >
              Yes, delete it
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="w-full mt-2 text-gray-500 py-2.5 text-sm font-medium"
            >
              Cancel
            </button>
          </>
        )}
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
      `}</style>
    </div>
  );
}