import { motion } from "motion/react";
import { Camada, Flutuar } from "./Paralaxe";

const BRONZE = "#9a5f32";
const VERDETE = "#2f7a6f";
const TINTA = "#1c1917";
const APAGADO = "#78716c";
const RAMPA = ["#1f6f78", "#3f8f94", "#7fb9b5"];

const menu = ["Início", "Acessos", "Aprovação de compras", "Distribuição", "Frases do painel", "Notificações"];

const indicadores = [
  { rotulo: "Pendentes", valor: "12" },
  { rotulo: "Aprovadas hoje", valor: "38" },
  { rotulo: "Em análise", valor: "R$ 84,2 mil" },
];

const semanas = [34, 52, 41, 66, 58, 72, 49, 81, 63, 77, 70, 88];

const pedidos = [
  { item: "Monitor multiparamétrico", setor: "Enfermagem", valor: "R$ 18.400", status: "Pendente" },
  { item: "Cadeira de infusão", setor: "Oncologia", valor: "R$ 9.870", status: "Aprovado" },
  { item: "Reagentes", setor: "Laboratório", valor: "R$ 4.215", status: "Em análise" },
];

const corStatus: Record<string, string> = {
  Pendente: "bg-[#f6ebe1] text-[#8a5328]",
  Aprovado: "bg-[#e3f1ee] text-[#2f7a6f]",
  "Em análise": "bg-[#efedea] text-[#57534e]",
};

function Visto({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#ffffff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

export function LabsIlustracao() {
  return (
    <div className="absolute inset-0" style={{ color: TINTA }}>
      <Camada profundidade={0.45} className="left-[5%] top-[9%] w-[90%]">
        <div className="grid grid-cols-[20cqw_1fr] overflow-hidden rounded-[2cqw] bg-white shadow-[0_5cqw_10cqw_-4cqw_rgba(0,0,0,0.6)]">
          <aside className="border-r border-[#ece7e1] bg-[#faf8f5] p-[2cqw]">
            <p className="font-serif text-[2.7cqw] font-semibold tracking-tight">M4Labs</p>
            <ul className="mt-[3cqw] flex flex-col gap-[0.6cqw]">
              {menu.map((item) => {
                const ativo = item === "Aprovação de compras";
                return (
                  <li
                    key={item}
                    className="flex items-center gap-[1cqw] rounded-[1cqw] px-[1cqw] py-[0.9cqw] text-[1.35cqw]"
                    style={ativo ? { background: "#e3f1ee", color: VERDETE } : { color: APAGADO }}
                  >
                    <span className="size-[1.5cqw] shrink-0 rounded-[0.4cqw] border-[0.25cqw]" style={{ borderColor: ativo ? VERDETE : "#d6d0c9" }} />
                    <span className="truncate">{item}</span>
                  </li>
                );
              })}
            </ul>
          </aside>

          <div className="p-[2.6cqw]">
            <div className="flex items-start justify-between gap-[2cqw]">
              <div>
                <p className="font-serif text-[3.2cqw] font-semibold leading-none tracking-tight">Aprovação de compras</p>
                <p className="mt-[0.9cqw] text-[1.4cqw]" style={{ color: APAGADO }}>
                  Setembro · 38 solicitações
                </p>
              </div>
              <span className="shrink-0 rounded-[1cqw] px-[1.6cqw] py-[1cqw] text-[1.35cqw] font-medium text-white" style={{ background: BRONZE }}>
                Nova solicitação
              </span>
            </div>

            <div className="mt-[2.4cqw] grid grid-cols-3 gap-[1.3cqw]">
              {indicadores.map((ind) => (
                <div key={ind.rotulo} className="rounded-[1.3cqw] border border-[#ece7e1] p-[1.5cqw]">
                  <p className="text-[1.3cqw]" style={{ color: APAGADO }}>
                    {ind.rotulo}
                  </p>
                  <p className="tabular mt-[0.5cqw] text-[2.7cqw] font-semibold leading-none tracking-tight">{ind.valor}</p>
                </div>
              ))}
            </div>

            <div className="mt-[1.6cqw] rounded-[1.3cqw] border border-[#ece7e1] p-[1.6cqw]">
              <p className="text-[1.3cqw]" style={{ color: APAGADO }}>
                Solicitações por semana
              </p>
              <div className="mt-[1.2cqw] flex h-[8.5cqw] items-end gap-[0.8cqw]">
                {semanas.map((altura, i) => (
                  <motion.span
                    key={i}
                    className="flex-1 origin-bottom rounded-t-[0.5cqw]"
                    style={{ height: `${altura}%`, background: RAMPA[i % 3] }}
                    animate={{ scaleY: [1, 0.86, 1] }}
                    transition={{ duration: 3, delay: i * 0.12, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </div>

            <ul className="mt-[1.6cqw] flex flex-col">
              {pedidos.map((p) => (
                <li key={p.item} className="grid grid-cols-[1fr_auto_auto] items-center gap-[1.6cqw] border-t border-[#f1ede8] py-[1.1cqw] text-[1.35cqw]">
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{p.item}</span>
                    <span className="block truncate text-[1.2cqw]" style={{ color: APAGADO }}>
                      {p.setor}
                    </span>
                  </span>
                  <span className="tabular">{p.valor}</span>
                  <span className={`rounded-full px-[1.2cqw] py-[0.4cqw] text-[1.2cqw] ${corStatus[p.status]}`}>{p.status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Camada>

      <Camada profundidade={1} className="right-[9%] top-[3.5%] w-[26%]">
        <Flutuar amplitude={8} duracao={4.2}>
          <div className="flex items-center gap-[1cqw] rounded-full bg-[#0f1f1d] px-[1.6cqw] py-[1cqw] text-[1.35cqw] text-white shadow-[0_2cqw_4cqw_-1cqw_rgba(0,0,0,0.5)]">
            <span className="size-[1.2cqw] rounded-full" style={{ background: "#d99a63" }} />
            3 aguardando você
          </div>
        </Flutuar>
      </Camada>

      <Camada profundidade={1.35} className="bottom-[7%] right-[3%] w-[36%]">
        <Flutuar amplitude={6} duracao={5} atraso={0.6}>
          <div className="flex items-center gap-[1.6cqw] rounded-[2.2cqw] bg-white p-[1.9cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(0,0,0,0.55)]">
            <span className="grid size-[4.6cqw] shrink-0 place-items-center rounded-full" style={{ background: VERDETE }}>
              <Visto className="w-[2.4cqw]" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[1.8cqw] font-semibold">Compra aprovada</span>
              <span className="tabular block truncate text-[1.45cqw]" style={{ color: APAGADO }}>
                Cadeira de infusão · R$ 9.870
              </span>
            </span>
          </div>
        </Flutuar>
      </Camada>
    </div>
  );
}
