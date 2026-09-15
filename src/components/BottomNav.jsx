import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const { pathname } = useLocation();

  const tabs = [
    { path: "/", icon: "🏠", label: "Explore" },
    { path: "/map", icon: "🗺️", label: "Map" },
    { path: "/notifications", icon: "🔔", label: "Alerts" },
    { path: "/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <div className="fixed bottom-5 left-0 right-0 flex justify-center z-[9999] pointer-events-none">
      <nav className="bg-white/95 backdrop-blur-xl rounded-full shadow-[0_10px_40px_rgba(22,163,74,0.25)] border border-green-100 flex gap-1 p-1.5 pointer-events-auto">
        {tabs.map((t) => {
          const active = pathname === t.path;
          return (
            <Link
              key={t.path}
              to={t.path}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full transition-all duration-300 ${
                active
                  ? "bg-gradient-to-br from-green-600 to-yellow-400 text-white shadow-md"
                  : "text-gray-500 hover:text-green-600"
              }`}
            >
              <span className="text-base">{t.icon}</span>
              {active && (
                <span className="text-xs font-semibold whitespace-nowrap">
                  {t.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}