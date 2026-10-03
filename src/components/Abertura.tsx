import type { CSSProperties } from "react";
import { cabecalho } from "../data/cabecalho";

const atraso = (segundos: number) => ({ "--atraso": `${segundos}s` }) as CSSProperties;

export function Abertura() {
  return (
    <section aria-label="Abertura" className="relative flex flex-col pb-10 pt-14 sm:pb-12 sm:pt-20 md:pb-16 md:pt-24">
      <h1 className="sombra font-jp font-normal leading-[1.02] tracking-[-0.01em]">
        {cabecalho.titulo.map((linha, i) => (
          <span key={linha} className="revelar block text-[clamp(2rem,7.5vw,7.5rem)]" style={atraso(0.35 + i * 0.16)}>
            {linha}
          </span>
        ))}
      </h1>

      <div className="mt-5 flex items-center gap-4 sm:mt-8 sm:gap-5 md:mt-10">
        <span className="tracejar h-px w-10 shrink-0 origin-left bg-accent sm:w-12 md:w-20" style={atraso(0.75)} />
        <p className="revelar sombra whitespace-nowrap font-jp text-[clamp(1.05rem,2.8vw,2.5rem)] font-normal tracking-[0.02em] text-ink" style={atraso(0.85)}>
          {cabecalho.programa}
        </p>
      </div>

      <p className="subir sombra legenda mt-6 hidden max-w-[34ch] text-ink sm:block md:mt-8" style={atraso(1.15)}>
        {cabecalho.convite}
      </p>

      <span
        aria-hidden
        className="surgir absolute right-0 top-14 rounded-[6px] border-2 border-[#d9452b] px-1.5 py-2 font-jp text-[clamp(0.8rem,1.6vw,1.35rem)] sm:top-20 sm:px-2 sm:py-3 font-normal leading-[1.15] text-[#e8563a] [writing-mode:vertical-rl] md:top-24"
        style={atraso(1.05)}
      >
        {cabecalho.selo}
      </span>
    </section>
  );
}
