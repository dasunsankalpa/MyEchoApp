import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DeleteAccountSheet({ open, onClose }) {
  const [step, setStep] = useState(1);
  const [keepEchoes, setKeepEchoes] = useState(true);
  const [confirmText, setConfirmText] = useState("");
  const navigate = useNavigate();

  if (!open) return null;

  const reset = () => {
    setStep(1);
    setKeepEchoes(true);
    setConfirmText("");
    onClose();
  };

  const handleFinalDelete = () => {
    reset();
    navigate("/deleted");
  };

  return (
    <div className="fixed inset-0 z-[10000] flex items-end justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={reset}
      />
      <div className="relative w-full max-w-[430px] bg-white rounded-t-[32px] p-6 pb-10 animate-slide-up max-h-[90vh] overflow-y-auto">
        <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-5" />

        {/* STEP 1 — Warning */}
        {step === 1 && (
          <>
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-3xl mx-auto mb-4">
              ⚠️
            </div>
            <h3 className="text-xl font-extrabold text-gray-900 text-center">
              Delete your account?
            </h3>
            <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
              This will permanently remove your profile and data. This action
              cannot be undone.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 mt-5 space-y-2">
              <p className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                What will happen
              </p>
              {[
                "Your profile will be deleted",
                "You'll be signed out of all devices",
                "You won't appear in others' feeds",
                "You can choose what happens to your Echoes next",
              ].map((t) => (
                <div key={t} className="flex gap-2 items-start">
                  <span className="text-red-400 mt-0.5">•</span>
                  <span className="text-xs text-gray-600 leading-snug">
                    {t}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full mt-6 bg-red-600 text-white py-3.5 rounded-2xl font-bold active:scale-95 transition"
            >
              Continue
            </button>
            <button
              onClick={reset}
              className="w-full mt-2 text-gray-500 py-2.5 text-sm font-medium"
            >
              Keep my account
            </button>
          </>
        )}

        {/* STEP 2 — What happens to Echoes */}
        {step === 2 && (
          <>
            <h3 className="text-xl font-extrabold text-gray-900 text-center">
              What about your Echoes?
            </h3>
            <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
              You've left 12 memories on the map. Choose what happens to them.
            </p>

            <div className="mt-5 space-y-3">
              <button
                onClick={() => setKeepEchoes(true)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                  keepEchoes
                    ? "bg-green-50 border-green-400"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🕊️</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900">
                      Keep them anonymously
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-snug">
                      Your Echoes stay on the map, shown as "Anonymous". People
                      can still discover your memories — but your name is
                      removed forever.
                    </p>
                  </div>
                  {keepEchoes && (
                    <span className="text-green-600 font-bold">✓</span>
                  )}
                </div>
              </button>

              <button
                onClick={() => setKeepEchoes(false)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                  !keepEchoes
                    ? "bg-red-50 border-red-400"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🗑️</span>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-gray-900">
                      Delete them too
                    </p>
                    <p className="text-xs text-gray-500 mt-1 leading-snug">
                      All 12 of your Echoes will be removed from the map. This
                      cannot be undone.
                    </p>
                  </div>
                  {!keepEchoes && (
                    <span className="text-red-600 font-bold">✓</span>
                  )}
                </div>
              </button>
            </div>

            <button
              onClick={() => setStep(3)}
              className="w-full mt-6 bg-gradient-to-br from-red-500 to-red-600 text-white py-3.5 rounded-2xl font-bold active:scale-95 transition"
            >
              Continue
            </button>
            <button
              onClick={() => setStep(1)}
              className="w-full mt-2 text-gray-500 py-2.5 text-sm font-medium"
            >
              ← Back
            </button>
          </>
        )}

        {/* STEP 3 — Type to confirm */}
        {step === 3 && (
          <>
            <h3 className="text-xl font-extrabold text-gray-900 text-center">
              Final confirmation
            </h3>
            <p className="text-sm text-gray-500 text-center mt-2 leading-relaxed">
              Type <span className="font-bold text-red-600">DELETE</span> below
              to permanently remove your account.
            </p>

            <input
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value.toUpperCase())}
              placeholder="Type DELETE"
              className="w-full mt-5 p-4 rounded-2xl border-2 border-gray-200 focus:border-red-400 focus:outline-none text-center text-lg font-bold tracking-widest text-red-600 placeholder:text-gray-300"
            />

            <div className="bg-gray-50 rounded-2xl p-4 mt-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                {keepEchoes
                  ? "Your account will be deleted. Your Echoes will stay on the map as Anonymous."
                  : "Your account and all 12 Echoes will be permanently deleted."}
              </p>
            </div>

            <button
              disabled={confirmText !== "DELETE"}
              onClick={handleFinalDelete}
              className="w-full mt-5 bg-red-600 text-white py-3.5 rounded-2xl font-bold disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 transition"
            >
              Permanently delete my account
            </button>
            <button
              onClick={() => setStep(2)}
              className="w-full mt-2 text-gray-500 py-2.5 text-sm font-medium"
            >
              ← Back
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