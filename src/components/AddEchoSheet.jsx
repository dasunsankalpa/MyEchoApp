import { useState } from "react";

export default function AddEchoSheet({ open, onClose, location, onPost }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [anon, setAnon] = useState(false);
  const [privacy, setPrivacy] = useState("public");

  if (!open) return null;

  const privacyOptions = [
    { id: "public", label: "Public", icon: "🌍", desc: "Anyone nearby" },
    { id: "friends", label: "Friends", icon: "👥", desc: "People you follow" },
    { id: "onlyme", label: "Only me", icon: "🔒", desc: "Private diary" },
  ];

  const pickImage = () => {
    const samples = [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ];
    setImage(samples[Math.floor(Math.random() * samples.length)]);
  };

  const handlePost = () => {
    if (!text.trim()) return;
    onPost({
      text,
      image,
      anon,
      privacy,
      lat: location?.lat ?? 8.7514,
      lng: location?.lng ?? 80.497,
    });
    setText("");
    setImage(null);
    setAnon(false);
    setPrivacy("public");
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[430px] bg-white rounded-t-[32px] p-6 pb-8 animate-slide-up max-h-[88vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />

        <h3 className="text-lg font-extrabold text-gray-900">
          Leave an Echo here
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">
          Your memory will live at this exact spot
        </p>

        {/* Location preview */}
        <div className="flex items-center gap-2 mt-4 bg-green-50 rounded-2xl p-3 border border-green-100">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-yellow-400 flex items-center justify-center text-white text-base">
            📍
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-green-800">
              Your current location
            </p>
            <p className="text-[10px] text-green-600 truncate">
              {location
                ? `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`
                : "Detecting…"}
            </p>
          </div>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
        </div>

        {/* Image preview */}
        {image && (
          <div className="relative mt-4 rounded-2xl overflow-hidden">
            <img
              src={image}
              alt="Attached"
              className="w-full h-40 object-cover"
            />
            <button
              onClick={() => setImage(null)}
              className="absolute top-3 right-3 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center text-sm"
            >
              ✕
            </button>
          </div>
        )}

        {/* Memory text */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What happened here? A moment, a feeling, a story…"
          className="w-full h-28 p-4 mt-4 rounded-2xl bg-green-50/50 border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 resize-none placeholder:text-gray-400 text-sm"
        />

        {/* Attach row */}
        <div className="flex gap-3 mt-3">
          <button
            onClick={pickImage}
            className="flex-1 h-11 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center gap-2 text-sm font-semibold active:scale-95 transition"
          >
            📷 Photo
          </button>
          <button className="flex-1 h-11 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center gap-2 text-sm font-semibold active:scale-95 transition">
            🎤 Voice
          </button>
        </div>

        {/* Privacy selector */}
        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-5 mb-2">
          Who can see this
        </p>
        <div className="grid grid-cols-3 gap-2">
          {privacyOptions.map((o) => (
            <button
              key={o.id}
              onClick={() => setPrivacy(o.id)}
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
          {privacyOptions.find((o) => o.id === privacy)?.desc}
        </p>

        {/* Anonymous */}
        <label className="flex items-center justify-between bg-gray-50 rounded-2xl p-4 mt-4">
          <div>
            <p className="text-sm text-gray-800 font-medium">
              Post anonymously
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Your name won't be shown
            </p>
          </div>
          <input
            type="checkbox"
            checked={anon}
            onChange={(e) => setAnon(e.target.checked)}
            className="w-5 h-5 accent-green-600"
          />
        </label>

        <button
          disabled={!text.trim()}
          onClick={handlePost}
          className="w-full mt-5 bg-gradient-to-br from-green-600 to-yellow-400 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-600/30 active:scale-95 disabled:opacity-40 disabled:shadow-none transition"
        >
          Drop Echo here
        </button>
        <button
          onClick={onClose}
          className="w-full mt-2 text-gray-500 py-2 text-sm font-medium"
        >
          Cancel
        </button>
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