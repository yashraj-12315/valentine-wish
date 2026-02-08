"use client";

import { useState, useRef, useCallback, useEffect } from "react";

const LOVE_QUOTES = [
  "You are my today and all of my tomorrows.",
  "I fell in love with you because of the million tiny things you do that add up to one big reason.",
  "In you I’ve found the love of my life and my closest, truest friend.",
  "I love you not only for what you are, but for what I am when I am with you.",
  "Every love story is beautiful, but ours is my favourite.",
  "I choose you. And I’ll choose you over and over. Without pause, without doubt.",
  "You are my heart, my life, my one and only thought.",
  "I saw that you were perfect, and so I loved you. Then I saw that you were not perfect and I loved you even more.",
];

function Heart({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`inline-block text-rose-400 select-none ${className}`}
      style={style}
      aria-hidden
    >
      ❤️
    </span>
  );
}

export default function Home() {
  const [saidYes, setSaidYes] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  // Use fixed index for SSR/hydration; pick random only after mount to avoid hydration mismatch
  const [quoteIndex, setQuoteIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuoteIndex(Math.floor(Math.random() * LOVE_QUOTES.length));
  }, []);

  const moveNoButton = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);
      if (dist < 120) {
        const angle = Math.atan2(dy, dx);
        const push = 140;
        setNoPosition((prev) => ({
          x: prev.x + Math.cos(angle) * push + (Math.random() - 0.5) * 40,
          y: prev.y + Math.sin(angle) * push + (Math.random() - 0.5) * 40,
        }));
      }
    },
    []
  );

  return (
    <div
      ref={containerRef}
      className="min-h-screen relative flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-[#0f0a0b] via-[#1a0f14] to-[#2d1520] overflow-hidden"
    >
      {/* Background floating hearts */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className={`absolute text-2xl md:text-3xl opacity-40 heart-float heart-float-delay-${(i % 6) + 1}`}
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${5 + (i * 11) % 85}%`,
            }}
          >
            ❤️
          </span>
        ))}
      </div>

      {!saidYes ? (
        <div className="relative z-10 text-center max-w-xl mx-auto">
          <p
            className="font-[family-name:var(--font-dancing)] text-xl md:text-2xl text-rose-300 mb-6"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            {LOVE_QUOTES[quoteIndex]}
          </p>

          <h1
            className="text-4xl md:text-6xl font-semibold text-white mb-2"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            Sayantani,
          </h1>
          <p
            className="text-2xl md:text-3xl text-rose-200 mb-12"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            Will you be my Valentine?
          </p>

          <div className="relative flex items-center justify-center gap-6 min-h-[80px] py-4">
            <button
              type="button"
              onClick={() => setSaidYes(true)}
              className="relative z-10 px-10 py-4 rounded-full bg-gradient-to-r from-rose-500 to-rose-600 text-white text-xl font-medium shadow-lg shadow-rose-900/40 hover:from-rose-400 hover:to-rose-500 hover:scale-105 active:scale-100 transition-all duration-200 pulse-glow"
              style={{ fontFamily: '"Dancing Script", cursive' }}
            >
              Yes! 💕
            </button>
            <button
              type="button"
              onMouseMove={moveNoButton}
              onMouseEnter={moveNoButton}
              className="absolute left-1/2 top-1/2 px-8 py-3 rounded-full bg-white/10 text-rose-200/80 text-lg border border-rose-400/30 transition-[transform] duration-100 ease-out"
              style={{
                fontFamily: "var(--font-dancing)",
                transform: `translate(calc(-50% + 90px + ${noPosition.x}px), calc(-50% + ${noPosition.y}px))`,
              }}
            >
              No
            </button>
          </div>

          <p className="mt-8 text-rose-400/70 text-sm">
            (There’s only one right answer, Sayantani 😊)
          </p>
        </div>
      ) : (
        <div className="relative z-10 text-center animate-fade-in">
          <div className="flex justify-center gap-2 mb-6">
            {[0, 1, 2, 3, 4].map((i) => (
              <Heart
                key={i}
                className="heart-pop text-4xl md:text-5xl"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <h2
            className="text-4xl md:text-6xl text-white mb-4"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            You said Yes!
          </h2>
          <p
            className="text-2xl md:text-3xl text-rose-300 mb-8"
            style={{ fontFamily: '"Dancing Script", cursive' }}
          >
            I love you, Sayantani 💕
          </p>
          <p
            className="text-xl text-rose-200/90 max-w-md mx-auto"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            You just made me the luckiest person. Happy Valentine’s Day, my love.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {[...Array(8)].map((_, i) => (
              <span
                key={i}
                className="heart-float text-2xl"
                style={{
                  animationDelay: `${i * 0.2}s`,
                  animationDuration: `${3 + (i % 3)}s`,
                }}
              >
                ❤️
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
