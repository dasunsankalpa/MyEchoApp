import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Link } from "react-router-dom";
import L from "leaflet";
import { echoes as initialEchoes } from "../data/echoes";
import SmartImage from "../components/SmartImage";
import AddEchoSheet from "../components/AddEchoSheet";
import MyEchoSheet from "../components/MyEchoSheet";

/* ---------- Custom markers ---------- */
const userIcon = L.divIcon({
  className: "user-marker",
  html: `
    <div style="position:relative;width:24px;height:24px;">
      <div style="position:absolute;inset:0;background:#16a34a;border-radius:50%;border:3px solid white;box-shadow:0 4px 12px rgba(22,163,74,0.5);"></div>
      <div style="position:absolute;inset:-12px;background:rgba(22,163,74,0.25);border-radius:50%;animation:pulse 2s infinite;"></div>
    </div>
    <style>
      @keyframes pulse {
        0%,100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.8); opacity: 0; }
      }
    </style>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const newEchoIcon = L.divIcon({
  className: "new-echo-marker",
  html: `
    <div style="
      width:34px;height:34px;border-radius:50% 50% 50% 0;
      background:linear-gradient(135deg,#16a34a,#facc15);
      transform:rotate(-45deg);
      border:3px solid white;
      box-shadow:0 6px 20px rgba(22,163,74,0.5);
      display:flex;align-items:center;justify-content:center;
    ">
      <span style="transform:rotate(45deg);font-size:14px;">✨</span>
    </div>
  `,
  iconSize: [34, 34],
  iconAnchor: [17, 34],
});

/* ---------- Recenter helper ---------- */
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView([position.lat, position.lng], map.getZoom());
  }, [position, map]);
  return null;
}

/* ---------- Privacy badge ---------- */
function PrivacyBadge({ privacy }) {
  if (!privacy || privacy === "public") return null;
  const map = {
    friends: { icon: "👥", text: "Friends", cls: "bg-blue-100 text-blue-700" },
    onlyme: { icon: "🔒", text: "Private", cls: "bg-gray-200 text-gray-700" },
  };
  const b = map[privacy];
  if (!b) return null;
  return (
    <span
      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase ${b.cls}`}
    >
      {b.icon} {b.text}
    </span>
  );
}

/* ---------- Main page ---------- */
export default function MapPage() {
  const [echoes, setEchoes] = useState(initialEchoes);
  const [userPos, setUserPos] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [mySheetEcho, setMySheetEcho] = useState(null);
  const [toast, setToast] = useState(null);
  const [hoverFAB, setHoverFAB] = useState(false);
  const [showHint, setShowHint] = useState(false);

  /* Geolocation */
  useEffect(() => {
    if (!navigator.geolocation) {
      setUserPos({ lat: 8.7514, lng: 80.497 });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setUserPos({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () => setUserPos({ lat: 8.7514, lng: 80.497 }),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, []);

  /* First-visit tooltip hint */
  useEffect(() => {
    const seen = localStorage.getItem("echoes_fab_hint_seen");
    if (!seen) {
      setShowHint(true);
      const t = setTimeout(() => {
        setShowHint(false);
        localStorage.setItem("echoes_fab_hint_seen", "1");
      }, 3500);
      return () => clearTimeout(t);
    }
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  const handlePost = ({ text, image, anon, privacy, lat, lng }) => {
    const newEcho = {
      id: Date.now(),
      place: "Dropped here",
      distance: "0m away",
      lat,
      lng,
      title: text.slice(0, 40) || "New memory",
      memory: text,
      author: anon ? "Anonymous" : "You",
      isMine: true,
      date: String(new Date().getFullYear()),
      reactions: 0,
      placeClosed: false,
      visibility: privacy,
      privacy,
      image,
      avatar: anon
        ? null
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80",
    };

    setEchoes([newEcho, ...echoes]);
    setSheetOpen(false);
    showToast("Echo dropped here ✨");
  };

  const handleDelete = (id) => {
    setEchoes((prev) => prev.filter((e) => e.id !== id));
    showToast("Echo deleted 🗑️");
  };

  const handlePrivacyChange = (id, privacy) => {
    setEchoes((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, privacy, visibility: privacy } : e
      )
    );
    showToast(
      privacy === "onlyme"
        ? "Now private 🔒"
        : privacy === "friends"
        ? "Shared with friends 👥"
        : "Now public 🌍"
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* ===== Map ===== */}
      <div className="h-[58vh] relative">
        <MapContainer
          center={[8.7514, 80.497]}
          zoom={14}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={false}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* User location */}
          {userPos && (
            <>
              <Marker position={[userPos.lat, userPos.lng]} icon={userIcon}>
                <Popup>You are here 📍</Popup>
              </Marker>
              <Recenter position={userPos} />
            </>
          )}

          {/* Echoes */}
          {echoes.map((e) =>
            e.isMine && e.id > 1000000 ? (
              <Marker
                key={e.id}
                position={[e.lat, e.lng]}
                icon={newEchoIcon}
                eventHandlers={{
                  click: () => setMySheetEcho(e),
                }}
              >
                <Popup>
                  <strong>{e.title}</strong>
                  <br />
                  <span style={{ fontSize: 11 }}>Just dropped ✨</span>
                </Popup>
              </Marker>
            ) : (
              <Marker key={e.id} position={[e.lat, e.lng]}>
                <Popup>
                  <strong>{e.title}</strong>
                  <br />
                  {e.place}
                </Popup>
              </Marker>
            )
          )}
        </MapContainer>

        {/* ---- Floating header ---- */}
        <div className="absolute top-6 left-5 right-5 z-[1000]">
          <div className="bg-white/95 backdrop-blur-xl rounded-2xl px-4 py-3 shadow-lg border border-green-100 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400">You're near</p>
              <p className="text-sm font-bold text-gray-900">
                📍 Vavuniya · {echoes.length} Echoes
              </p>
            </div>
            <Link
              to="/"
              className="w-9 h-9 rounded-full bg-green-50 flex items-center justify-center text-green-700 text-sm font-bold"
            >
              ✕
            </Link>
          </div>
        </div>

        {/* ---- Add FAB with hover tooltip (green/yellow) ---- */}
        <div
          className="absolute bottom-8 right-4 z-[1000] flex flex-col items-end"
          onMouseEnter={() => setHoverFAB(true)}
          onMouseLeave={() => setHoverFAB(false)}
        >
          {/* Tooltip */}
          <div
            className={`
              relative mb-2 mr-1
              bg-gradient-to-br from-green-600 to-yellow-400
              text-white text-xs font-bold
              px-3.5 py-2 rounded-xl
              shadow-[0_8px_24px_rgba(22,163,74,0.35)]
              whitespace-nowrap
              transition-all duration-200 origin-bottom-right
              flex items-center gap-1.5
              ${
                hoverFAB || showHint
                  ? "opacity-100 translate-y-0 scale-100"
                  : "opacity-0 translate-y-2 scale-95 pointer-events-none"
              }
            `}
          >
            <span className="text-sm leading-none">✨</span>
            <span>Add your memory for this location</span>
            <span className="absolute -bottom-1 right-4 w-2 h-2 bg-yellow-400 rotate-45" />
          </div>

          {/* FAB */}
          <button
            onClick={() => setSheetOpen(true)}
            onTouchStart={() => setHoverFAB(true)}
            onTouchEnd={() => setTimeout(() => setHoverFAB(false), 1500)}
            aria-label="Add Echo here"
            className="
              w-14 h-14 rounded-full
              bg-gradient-to-br from-green-600 to-yellow-400
              text-white
              shadow-[0_8px_24px_rgba(22,163,74,0.45)]
              flex items-center justify-center
              active:scale-95 transition-all duration-200
              ring-4 ring-white/50
            "
          >
            <span className="text-2xl leading-none font-bold">＋</span>
          </button>
        </div>
      </div>

      {/* ===== List below map ===== */}
      <div className="flex-1 overflow-y-auto p-5 pb-32 bg-gray-50">
        <h2 className="text-sm font-bold text-gray-900 mb-3">
          Echoes on this map
        </h2>
        <div className="space-y-3">
          {echoes.map((e) => {
            const isMine = e.isMine;

            const Card = (
              <div className="bg-white rounded-2xl border border-green-100/60 shadow-sm overflow-hidden flex">
                <SmartImage
                  src={e.image}
                  alt={e.title}
                  className="w-24 h-24 flex-shrink-0"
                  fallback="📍"
                />
                <div className="p-3 flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <p className="text-xs text-green-700 font-semibold truncate">
                      📍 {e.place} · {e.distance}
                    </p>
                    {isMine && (
                      <span className="text-[9px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full font-bold uppercase">
                        Yours
                      </span>
                    )}
                    {isMine && <PrivacyBadge privacy={e.privacy} />}
                  </div>
                  <p className="font-bold text-gray-900 mt-1 text-sm line-clamp-1">
                    {e.title}
                  </p>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 leading-snug">
                    {e.memory}
                  </p>
                </div>
                {isMine && (
                  <button
                    onClick={(ev) => {
                      ev.stopPropagation();
                      setMySheetEcho(e);
                    }}
                    className="px-3 text-gray-400 text-lg"
                    aria-label="Echo options"
                  >
                    ⋯
                  </button>
                )}
              </div>
            );

            return isMine ? (
              <div key={e.id} onClick={() => setMySheetEcho(e)}>
                {Card}
              </div>
            ) : (
              <div key={e.id}>{Card}</div>
            );
          })}
        </div>
      </div>

      {/* ===== Sheets ===== */}
      <AddEchoSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        location={userPos}
        onPost={handlePost}
      />

      <MyEchoSheet
        open={!!mySheetEcho}
        echo={mySheetEcho}
        onClose={() => setMySheetEcho(null)}
        onDelete={handleDelete}
        onPrivacyChange={handlePrivacyChange}
      />

      {/* ===== Toast ===== */}
      {toast && (
        <div className="fixed bottom-24 left-0 right-0 flex justify-center z-[10001] pointer-events-none">
          <div className="bg-gray-900 text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-xl animate-fade-in">
            {toast}
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.25s ease-out; }

        /* Push Leaflet attribution above FAB */
        .leaflet-bottom.leaflet-right {
          bottom: 80px !important;
        }
      `}</style>
    </div>
  );
}