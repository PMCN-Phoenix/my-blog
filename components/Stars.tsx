"use client";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  style: React.CSSProperties;
}

export default function Stars({ count = 100 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1;
      generated.push({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${size}px`,
          height: `${size}px`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 3}s`,
        },
      });
    }
    setStars(generated);
  }, [count]);

  return (
    <div className="absolute inset-0">
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute rounded-full bg-white opacity-70 animate-twinkle"
          style={star.style}
        />
      ))}
    </div>
  );
}