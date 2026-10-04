import type { CSSProperties } from "react";
import { Camada, Flutuar } from "./Paralaxe";

const TRACO = "#ece6dc";

const verificacoes = ["Acesso ao banco revisado", "Atualizações contra falhas", "Checagem antes de publicar"];

export function Escudo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2.5 4 5.6v6.1c0 4.7 3.3 8.6 8 9.8 4.7-1.2 8-5.1 8-9.8V5.6z" fill="rgba(236,230,220,0.06)" stroke={TRACO} strokeWidth="1.2" strokeLinejoin="round" />
      <path d="m8.6 12.2 2.4 2.4 4.6-4.9" stroke={TRACO} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SegurancaIlustracao() {
  return (
    <div className="absolute inset-0">
      <Camada profundidade={-0.4} className="-left-[8%] -bottom-[20%] w-[55%] opacity-[0.08]">
        <Escudo className="w-full" />
      </Camada>

      <Camada profundidade={0.4} className="left-[10%] top-1/2 w-[30%] -translate-y-1/2">
        <Flutuar amplitude={3} duracao={5}>
          <Escudo className="w-full" />
        </Flutuar>
      </Camada>

      <Camada profundidade={0.8} className="right-[8%] top-1/2 w-[46%] -translate-y-1/2">
        <ul className="flex flex-col gap-[2.2cqw]">
          {verificacoes.map((texto, i) => (
            <li
              key={texto}
              className="flex items-center gap-[2cqw] rounded-[2cqw] border border-white/10 bg-[#0d0b09]/85 px-[3cqw] py-[2.4cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(0,0,0,0.6)]"
            >
              <span
                className="pulsar grid size-[4.4cqw] shrink-0 place-items-center rounded-full bg-white/10"
                style={{ "--pulsar-atraso": `${i * 0.5}s` } as CSSProperties}
              >
                <svg viewBox="0 0 24 24" className="w-[2.6cqw]" fill="none" stroke={TRACO} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12.5 4.5 4.5L19 7.5" />
                </svg>
              </span>
              <span className="text-[2.6cqw] leading-tight text-[#ece6dc]">{texto}</span>
            </li>
          ))}
        </ul>
      </Camada>
    </div>
  );
}
