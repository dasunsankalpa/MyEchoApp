import { useState } from "react";

export default function SmartImage({
  src,
  alt = "",
  className = "",
  fallback = "📍",
  ...props
}) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  if (!src || error) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-green-100 to-yellow-100 text-3xl ${className}`}
      >
        {fallback}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-yellow-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        {...props}
      />
    </div>
  );
}