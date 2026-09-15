import { useState } from "react";

export default function ReportSheet({ open, onClose, echoTitle }) {
  const [reason, setReason] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const reasons = [
    "Harmful or hateful content",
    "Spam or misleading",
    "Wrong location",
    "Invasion of privacy",
    "Other",
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-[430px] bg-white rounded-t-[32px] p-6 pb-10 animate-slide-up">
        {submitted ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">✅</div>
            <h3 className="text-lg font-bold text-gray-900">
              Thank you for reporting
            </h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">
              Our team will review this Echo within 24 hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setReason("");
                onClose();
              }}
              className="w-full bg-gradient-to-br from-green-600 to-yellow-400 text-white py-3 rounded-2xl font-bold"
            >
              Done
            </button>
          </div>
        ) : (
          <>
            <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900">Report Echo</h3>
            <p className="text-xs text-gray-400 mt-1 line-clamp-1">
              {echoTitle}
            </p>

            <div className="mt-5 space-y-2">
              {reasons.map((r) => (
                <button
                  key={r}
                  onClick={() => setReason(r)}
                  className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition ${
                    reason === r
                      ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                      : "bg-gray-50 text-gray-700 border border-transparent"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <button
              disabled={!reason}
              onClick={() => setSubmitted(true)}
              className="w-full mt-5 bg-gradient-to-br from-green-600 to-yellow-400 text-white py-3.5 rounded-2xl font-bold disabled:opacity-40 transition"
            >
              Submit Report
            </button>
            <button
              onClick={onClose}
              className="w-full mt-2 text-gray-500 py-2 text-sm font-medium"
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