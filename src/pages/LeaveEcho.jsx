import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LeaveEcho() {
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [anon, setAnon] = useState(false);
  const [accuracy, setAccuracy] = useState("exact");
  const [posted, setPosted] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const pickImage = () => {
    const samples = [
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
      "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    ];
    setImage(samples[Math.floor(Math.random() * samples.length)]);
  };

  if (posted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-yellow-100 flex items-center justify-center text-5xl mb-6">
          ✅
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-2">
          Echo posted
        </h2>
        <p className="text-gray-500 text-sm mb-8">
          Your memory now lives at this place.
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-br from-green-600 to-yellow-400 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-green-600/30"
        >
          Back to Explore
        </button>
      </div>
    );
  }

  const visOptions = [
    { id: "public", label: "Public", icon: "🌍", desc: "Anyone nearby" },
    {
      id: "friends",
      label: "Friends",
      icon: "👥",
      desc: "Only people you follow",
    },
    { id: "onlyme", label: "Only me", icon: "🔒", desc: "Private diary" },
  ];

  const accOptions = [
    { id: "exact", label: "Exact spot", icon: "📍" },
    { id: "street", label: "Street", icon: "🛣️" },
    { id: "area", label: "Area only", icon: "🗺️" },
  ];

  return (
    <div className="pb-32">
      <div className="px-6 pt-14 pb-6">
        <Link to="/" className="text-sm text-green-700 font-medium">
          ← Back
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
          Leave an Echo
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          A memory for this place, for someone else to find
        </p>
      </div>

      <div className="px-5">
        <div className="bg-white rounded-3xl p-5 shadow-[0_8px_30px_rgba(22,163,74,0.1)] border border-green-100/60">
          {image && (
            <div className="relative mb-3 rounded-2xl overflow-hidden">
              <img
                src={image}
                alt="Selected memory"
                className="w-full h-44 object-cover"
              />
              <button
                onClick={() => setImage(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-black/60 text-white rounded-full flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>
          )}

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What happened here? A moment, a feeling, a story..."
            className="w-full h-32 p-4 rounded-2xl bg-green-50/50 border border-green-100 focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800 resize-none placeholder:text-gray-400"
          />

          <div className="flex gap-3 mt-3">
            <button
              onClick={pickImage}
              className="w-11 h-11 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center text-lg active:scale-95"
            >
              📷
            </button>
            <button className="w-11 h-11 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center text-lg active:scale-95">
              🎤
            </button>
            <button className="w-11 h-11 rounded-2xl bg-green-50 text-green-700 flex items-center justify-center text-lg active:scale-95">
              📍
            </button>
          </div>
        </div>

        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-6 mb-3 px-1">
          Who can see this
        </p>
        <div className="grid grid-cols-3 gap-2">
          {visOptions.map((o) => (
            <button
              key={o.id}
              onClick={() => setVisibility(o.id)}
              className={`p-3 rounded-2xl text-center transition border ${
                visibility === o.id
                  ? "bg-yellow-100 border-yellow-300"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="text-xl mb-1">{o.icon}</div>
              <p className="text-xs font-bold text-gray-800">{o.label}</p>
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 px-1">
          {visOptions.find((o) => o.id === visibility)?.desc}
        </p>

        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-6 mb-3 px-1">
          Location precision
        </p>
        <div className="grid grid-cols-3 gap-2">
          {accOptions.map((o) => (
            <button
              key={o.id}
              onClick={() => setAccuracy(o.id)}
              className={`p-3 rounded-2xl text-center transition border ${
                accuracy === o.id
                  ? "bg-yellow-100 border-yellow-300"
                  : "bg-white border-gray-100"
              }`}
            >
              <div className="text-xl mb-1">{o.icon}</div>
              <p className="text-xs font-bold text-gray-800">{o.label}</p>
            </button>
          ))}
        </div>

        <label className="flex items-center justify-between bg-white rounded-2xl p-4 mt-6 shadow-sm border border-gray-100">
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
          onClick={() => setPosted(true)}
          className="w-full mt-6 bg-gradient-to-br from-green-600 to-yellow-400 text-white py-4 rounded-2xl font-bold shadow-lg shadow-green-600/30 active:scale-95 disabled:opacity-40 disabled:shadow-none transition"
        >
          Post Echo
        </button>
        <p className="text-xs text-gray-400 text-center mt-3">
          Memories are reviewed for harmful content.
        </p>
      </div>
    </div>
  );
}