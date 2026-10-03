import { motion } from "motion/react";
import { Camada, Flutuar } from "./Paralaxe";

const OURO = "#e3b866";

const barras = [42, 64, 38, 76, 55, 88, 60];

const lancamentos = [
  { nome: "Salário", valor: "+ 6.500,00", positivo: true },
  { nome: "Mercado", valor: "− 312,40", positivo: false },
  { nome: "Internet", valor: "− 119,90", positivo: false },
];

function GravataBorboleta({ className, cor = OURO }: { className?: string; cor?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={cor} aria-hidden>
      <path d="M2 6.5 10 10v4l-8 3.5z" />
      <path d="M22 6.5 14 10v4l8 3.5z" />
      <rect x="9.6" y="9.4" width="4.8" height="5.2" rx="1.4" />
    </svg>
  );
}

export function MordomoIlustracao() {
  return (
    <div className="absolute inset-0">
      <Camada profundidade={-0.4} className="-right-[10%] -bottom-[18%] w-[62%] opacity-[0.07]">
        <GravataBorboleta className="w-full" cor="#ffffff" />
      </Camada>

      <Camada profundidade={0.5} className="left-[12%] top-[11%] w-[39%]">
        <div className="aspect-[9/18] rounded-[4.2cqw] border-[0.9cqw] border-[#08111f] bg-[#f6f7f9] p-[2.6cqw] shadow-[0_4cqw_8cqw_-2cqw_rgba(0,0,0,0.55)]">
          <div className="flex items-center justify-between">
            <span className="text-[1.9cqw] text-[#6b7482]">Olá, Ana</span>
            <span className="grid size-[4.2cqw] place-items-center rounded-full bg-[#10233d]">
              <GravataBorboleta className="w-[2.6cqw]" />
            </span>
          </div>
          <p className="mt-[2.6cqw] text-[1.6cqw] text-[#6b7482]">Saldo do mês</p>
          <p className="tabular text-[3.9cqw] font-semibold leading-tight tracking-tight text-[#0d1726]">R$ 8.420,50</p>

          <div className="mt-[2.6cqw] flex h-[10cqw] items-end gap-[0.9cqw]">
            {barras.map((altura, i) => (
              <motion.span
                key={i}
                className={`flex-1 origin-bottom rounded-[0.6cqw] ${i === 5 ? "bg-[#10233d]" : "bg-[#d9dee6]"}`}
                style={{ height: `${altura}%` }}
                animate={{ scaleY: [1, 0.82, 1] }}
                transition={{ duration: 2.6, delay: i * 0.18, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          <ul className="mt-[3cqw] flex flex-col gap-[1.9cqw]">
            {lancamentos.map((l) => (
              <li key={l.nome} className="flex items-center justify-between text-[1.7cqw]">
                <span className="flex items-center gap-[1.2cqw] text-[#253041]">
                  <span className={`size-[1.6cqw] rounded-full ${l.positivo ? "bg-[#3aa57a]" : "bg-[#c9d0da]"}`} />
                  {l.nome}
                </span>
                <span className={`tabular ${l.positivo ? "text-[#2f8f68]" : "text-[#253041]"}`}>{l.valor}</span>
              </li>
            ))}
          </ul>
        </div>
      </Camada>

      <Camada profundidade={1.3} className="right-[7%] top-[17%] w-[41%]">
        <Flutuar amplitude={6} duracao={4.5}>
          <div className="flex items-center gap-[1.8cqw] rounded-[2.4cqw] bg-white/95 p-[2cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(0,0,0,0.5)]">
            <span className="grid size-[5.4cqw] shrink-0 place-items-center rounded-full bg-[#10233d]">
              <GravataBorboleta className="w-[3.2cqw]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[1.95cqw] font-semibold text-[#0d1726]">Conta de luz paga</span>
              <span className="tabular block truncate text-[1.6cqw] text-[#6b7482]">R$ 189,90 · hoje, 08:00</span>
            </span>
          </div>
        </Flutuar>
      </Camada>

      <Camada profundidade={0.9} className="bottom-[13%] right-[12%] w-[31%]">
        <Flutuar amplitude={5} duracao={5.2} atraso={0.8}>
          <div className="flex items-center gap-[1.8cqw] rounded-[2.4cqw] border border-white/10 bg-[#0e1f36]/90 p-[2cqw] backdrop-blur">
            <svg viewBox="0 0 36 36" className="size-[6.4cqw] shrink-0 -rotate-90" aria-hidden>
              <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="4" />
              <circle cx="18" cy="18" r="15" fill="none" stroke={OURO} strokeWidth="4" strokeLinecap="round" strokeDasharray="94.2" strokeDashoffset="30.1" />
            </svg>
            <span>
              <span className="block text-[1.6cqw] text-white/60">Meta viagem</span>
              <span className="tabular block text-[2.8cqw] font-semibold leading-none text-white">68%</span>
            </span>
          </div>
        </Flutuar>
      </Camada>
    </div>
  );
}
