import { motion } from "motion/react";
import { Camada, Flutuar } from "./Paralaxe";

const LARANJA = "#ff6a2b";
const TINTA = "#2a1d14";

const servicos = [
  { nome: "Elétrica", caminho: "M13 2 4 14h6.5L9.5 22 19 10h-6.5z" },
  { nome: "Hidráulica", caminho: "M12 2.8S5 10.4 5 15a7 7 0 0 0 14 0c0-4.6-7-12.2-7-12.2z" },
  { nome: "Montagem", caminho: "M15.2 3.6a5 5 0 0 0-6 6.4L3 16.2 7.8 21l6.2-6.2a5 5 0 0 0 6.4-6l-3.1 3.1-3-.9-.9-3z" },
  { nome: "Pintura", caminho: "M4 3h13v6H4zM17 5h3v7h-8v3h-2v-5h8V7h-1zM10 16h2v6h-2z" },
];

function Casa({ className, cor = LARANJA }: { className?: string; cor?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={cor} aria-hidden>
      <path d="M3 11.2 12 3.5l9 7.7V21h-6.2v-5.6H9.2V21H3z" />
    </svg>
  );
}

export function ClicklarIlustracao() {
  return (
    <div className="absolute inset-0">
      <Camada profundidade={-0.4} className="-left-[8%] -bottom-[22%] w-[48%] opacity-[0.08]">
        <Casa className="w-full" cor={TINTA} />
      </Camada>

      <Camada profundidade={0.45} className="left-[7%] top-[12%] w-[68%]">
        <div className="overflow-hidden rounded-[2.2cqw] bg-white shadow-[0_4cqw_8cqw_-3cqw_rgba(120,52,10,0.35)]">
          <div className="flex items-center gap-[0.8cqw] border-b border-[#f1e6dc] px-[2cqw] py-[1.3cqw]">
            <span className="size-[1.1cqw] rounded-full bg-[#f1d9c6]" />
            <span className="size-[1.1cqw] rounded-full bg-[#f1d9c6]" />
            <span className="size-[1.1cqw] rounded-full bg-[#f1d9c6]" />
          </div>
          <div className="px-[3.2cqw] pb-[3.4cqw] pt-[2.4cqw]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-[0.8cqw] text-[2.1cqw] font-bold tracking-tight" style={{ color: TINTA }}>
                <Casa className="w-[2.6cqw]" />
                clicklar
              </span>
              <span className="rounded-full border border-[#efdccd] px-[1.6cqw] py-[0.5cqw] text-[1.4cqw]" style={{ color: TINTA }}>
                Entrar
              </span>
            </div>

            <p className="mt-[3cqw] max-w-[80%] font-display text-[4.3cqw] font-bold leading-[0.98] tracking-[-0.03em]" style={{ color: TINTA }}>
              Sua casa resolvida em um clique.
            </p>

            <div className="mt-[2.6cqw] flex items-center justify-between rounded-full border border-[#efdccd] py-[0.7cqw] pl-[2cqw] pr-[0.7cqw]">
              <span className="text-[1.55cqw] text-[#9a8272]">Qual serviço você precisa?</span>
              <span className="rounded-full px-[1.8cqw] py-[0.8cqw] text-[1.45cqw] font-semibold text-white" style={{ background: LARANJA }}>
                Buscar
              </span>
            </div>

            <ul className="mt-[2.6cqw] grid grid-cols-4 gap-[1.2cqw]">
              {servicos.map((s, i) => (
                <motion.li
                  key={s.nome}
                  className="flex flex-col items-center gap-[0.9cqw] rounded-[1.4cqw] bg-[#fff4ec] py-[1.8cqw]"
                  animate={{ backgroundColor: ["#fff4ec", "#ffe5d3", "#fff4ec"] }}
                  transition={{ duration: 3.2, delay: i * 0.8, repeat: Infinity, repeatDelay: 1.6 }}
                >
                  <svg viewBox="0 0 24 24" className="w-[3cqw]" fill={LARANJA} aria-hidden>
                    <path d={s.caminho} />
                  </svg>
                  <span className="text-[1.35cqw]" style={{ color: TINTA }}>
                    {s.nome}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </Camada>

      <Camada profundidade={1.6} className="right-[14%] top-[7%] w-[9%]">
        <motion.div animate={{ y: ["0%", "-18%", "0%"] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <svg viewBox="0 0 24 24" className="w-full drop-shadow-[0_1cqw_1cqw_rgba(120,52,10,0.35)]" aria-hidden>
            <path d="M12 22.5s7.5-7.4 7.5-13.2a7.5 7.5 0 0 0-15 0c0 5.8 7.5 13.2 7.5 13.2z" fill={LARANJA} />
            <circle cx="12" cy="9.4" r="3" fill="#ffffff" />
          </svg>
        </motion.div>
      </Camada>

      <Camada profundidade={1.2} className="right-[5%] top-[31%] w-[35%]">
        <Flutuar amplitude={6} duracao={4.6}>
          <div className="rounded-[2.4cqw] bg-white p-[2.2cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(120,52,10,0.4)]">
            <div className="flex items-center gap-[1.6cqw]">
              <span className="grid size-[5.4cqw] shrink-0 place-items-center rounded-full text-[1.9cqw] font-semibold text-white" style={{ background: LARANJA }}>
                RS
              </span>
              <span className="min-w-0">
                <span className="block truncate text-[1.95cqw] font-semibold" style={{ color: TINTA }}>
                  Rafael S.
                </span>
                <span className="block truncate text-[1.55cqw] text-[#9a8272]">Eletricista</span>
              </span>
            </div>
            <div className="mt-[1.8cqw] flex items-center justify-between gap-[1cqw] text-[1.5cqw]">
              <span className="tabular font-semibold" style={{ color: TINTA }}>
                <span style={{ color: LARANJA }}>★</span> 4,9
              </span>
              <span className="rounded-full bg-[#e6f6ec] px-[1.3cqw] py-[0.45cqw] text-[#1f7a4a]">chega em 40 min</span>
            </div>
          </div>
        </Flutuar>
      </Camada>

      <Camada profundidade={0.9} className="bottom-[9%] right-[9%] w-[37%]">
        <Flutuar amplitude={5} duracao={5.4} atraso={0.9}>
          <div className="flex items-center gap-[1.4cqw] rounded-full py-[1.3cqw] pl-[1.3cqw] pr-[2.4cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(40,20,5,0.5)]" style={{ background: TINTA }}>
            <span className="grid size-[3.8cqw] shrink-0 place-items-center rounded-full bg-[#3fbf7f]">
              <svg viewBox="0 0 24 24" className="w-[2.2cqw]" fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </span>
            <span className="truncate text-[1.6cqw] font-medium text-white">Agendado para amanhã, 9h</span>
          </div>
        </Flutuar>
      </Camada>
    </div>
  );
}
