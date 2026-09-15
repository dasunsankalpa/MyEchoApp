import { Link } from "react-router-dom";

export default function EchoCard({ echo }) {
  return (
    <Link to={`/echo/${echo.id}`}>
      <div className="bg-white rounded-2xl p-4 shadow-sm active:scale-95 transition">
        <div className="flex justify-between items-start">
          <span className="text-xs text-echo-600 font-medium">
            📍 {echo.place}
          </span>
          {echo.isMine && (
            <span className="text-xs bg-echo-100 text-echo-700 px-2 py-0.5 rounded-full">
              Yours
            </span>
          )}
        </div>
        <h3 className="font-semibold mt-2 text-gray-900">{echo.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{echo.memory}</p>
        <div className="flex justify-between mt-3 text-xs text-gray-400">
          <span>
            {echo.author} · {echo.date}
          </span>
          <span>❤️ {echo.reactions}</span>
        </div>
      </div>
    </Link>
  );
}