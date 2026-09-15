import { Link } from "react-router-dom";
import { notifications } from "../data/echoes";

export default function Notifications() {
  const icons = {
    nearby: "📍",
    react: "❤️",
    reply: "💬",
  };

  return (
    <div className="pb-32">
      <div className="px-6 pt-14 pb-6">
        <Link to="/" className="text-sm text-green-700 font-medium">
          ← Back
        </Link>
        <h1 className="text-3xl font-extrabold text-gray-900 mt-3 tracking-tight">
          Alerts
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Memories and reactions for you
        </p>
      </div>

      <div className="px-5 space-y-3">
        {notifications.map((n) => (
          <Link key={n.id} to={`/echo/${n.echoId}`}>
            <div className="bg-white rounded-3xl p-4 shadow-[0_8px_30px_rgba(22,163,74,0.1)] border border-green-100/60 flex gap-3 active:scale-[0.98] transition">
              <div className="w-11 h-11 rounded-full overflow-hidden flex-shrink-0">
                {n.avatar ? (
                  <img
                    src={n.avatar}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-green-100 to-yellow-100 flex items-center justify-center text-lg">
                    {icons[n.type]}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-gray-900 text-sm">{n.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                  {n.body}
                </p>
                <p className="text-[10px] text-gray-400 mt-1.5 uppercase tracking-wide">
                  {n.time}
                </p>
              </div>
            </div>
          </Link>
        ))}

        <div className="bg-gradient-to-br from-green-600 to-yellow-400 rounded-3xl p-5 text-white mt-6">
          <p className="text-xs uppercase tracking-widest opacity-80 font-semibold">
            Proximity alerts
          </p>
          <p className="font-bold text-lg mt-1">
            Get notified when you pass an Echo
          </p>
          <p className="text-xs text-green-50 mt-1.5">
            We'll only alert you for memories within 50m. You can turn this
            off anytime.
          </p>
          <div className="flex gap-2 mt-4">
            <button className="flex-1 bg-white text-green-700 py-2.5 rounded-xl font-bold text-sm">
              Enable
            </button>
            <button className="flex-1 bg-white/20 py-2.5 rounded-xl font-bold text-sm">
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}