import { useState } from "react";

export function Comparador({ antes, agora, nome }: { antes: string; agora: string; nome: string }) {
  const [corte, setCorte] = useState(50);

  return (
    <div className="relative aspect-[1880/1012] w-full overflow-hidden rounded-xl shadow-[0_24px_48px_-18px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
      <img src={agora} alt={`${nome}: versão atual`} draggable={false} className="absolute inset-0 size-full object-cover object-top" />
      <img
        src={antes}
        alt={`${nome}: primeira versão`}
        draggable={false}
        className="absolute inset-0 size-full object-cover object-top"
        style={{ clipPath: `inset(0 ${100 - corte}% 0 0)` }}
      />

      <div className="pointer-events-none absolute inset-y-0 w-px bg-white/80" style={{ left: `${corte}%` }}>
        <span className="absolute left-1/2 top-1/2 grid size-9 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ink text-bg shadow-lg">
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
          </svg>
        </span>
      </div>

      <span className="legenda pointer-events-none absolute left-3 top-3 rounded-full border border-white/10 bg-[#120d09]/85 px-3 py-1 text-ink">Primeira versão</span>
      <span className="legenda pointer-events-none absolute right-3 top-3 rounded-full border border-white/10 bg-[#120d09]/85 px-3 py-1 text-ink">Versão atual</span>

      <input
        type="range"
        min={0}
        max={100}
        value={corte}
        onChange={(e) => setCorte(Number(e.target.value))}
        aria-label="Comparar a primeira versão com a atual"
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
