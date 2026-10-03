import type { CSSProperties } from "react";
import { cabecalho } from "../data/cabecalho";

const atraso = (segundos: number) => ({ "--atraso": `${segundos}s` }) as CSSProperties;

export function Abertura() {
  return (
    <section aria-label="Abertura" className="relative flex flex-col pb-12 pt-20 md:pb-16 md:pt-24">
      <h1 className="sombra font-jp font-normal leading-[1.02] tracking-[-0.01em]">
        {cabecalho.titulo.map((linha, i) => (
          <span key={linha} className="revelar block text-[clamp(2.6rem,7.5vw,7.5rem)]" style={atraso(0.35 + i * 0.16)}>
            {linha}
          </span>
        ))}
      </h1>

      <div className="mt-8 flex items-center gap-5 md:mt-10">
        <span className="tracejar h-px w-12 origin-left bg-accent md:w-20" style={atraso(0.75)} />
        <p className="revelar sombra font-jp text-[clamp(1.3rem,2.8vw,2.5rem)] font-normal tracking-[0.02em] text-ink" style={atraso(0.85)}>
          {cabecalho.programa}
        </p>
      </div>

      <p className="subir sombra legenda mt-6 max-w-[34ch] text-ink md:mt-8" style={atraso(1.15)}>
        {cabecalho.convite}
      </p>

      <span
        aria-hidden
        className="surgir absolute right-0 top-20 rounded-[6px] border-2 border-[#d9452b] px-2 py-3 font-jp text-[clamp(0.95rem,1.6vw,1.35rem)] font-normal leading-[1.15] text-[#e8563a] [writing-mode:vertical-rl] md:top-24"
        style={atraso(1.05)}
      >
        {cabecalho.selo}
      </span>
    </section>
  );
}
