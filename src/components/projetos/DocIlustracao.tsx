import { motion } from "motion/react";
import { Camada, Flutuar } from "./Paralaxe";

const VERDETE = "#2f7a6f";
const BRONZE = "#9a5f32";
const TINTA = "#16201e";
const APAGADO = "#6f7a77";

const dias = [
  { dia: "Qua", n: "24" },
  { dia: "Qui", n: "25" },
  { dia: "Sex", n: "26" },
  { dia: "Sáb", n: "27" },
];

const consultas = [
  { hora: "08:00", nome: "J. Almeida", tipo: "Retorno", estado: "feita" },
  { hora: "08:30", nome: "R. Tavares", tipo: "Teleconsulta", estado: "agora" },
  { hora: "09:00", nome: "L. Prado", tipo: "Primeira consulta", estado: "depois" },
  { hora: "09:30", nome: "M. Couto", tipo: "Retorno", estado: "depois" },
];

function Icone({ caminho, className }: { caminho: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={caminho} />
    </svg>
  );
}

export function DocIlustracao() {
  return (
    <div className="absolute inset-0" style={{ color: TINTA }}>
      <Camada profundidade={0.5} className="left-[8%] top-[7%] w-[33%]">
        <div className="aspect-[9/18.5] rounded-[4.4cqw] border-[0.9cqw] border-[#0c1a18] bg-[#fbfaf8] p-[2.4cqw] shadow-[0_5cqw_9cqw_-3cqw_rgba(12,40,34,0.45)]">
          <p className="text-[1.6cqw]" style={{ color: APAGADO }}>
            Bom dia,
          </p>
          <p className="font-serif text-[3cqw] font-semibold leading-tight tracking-tight">Dra. Helena</p>

          <ul className="mt-[2cqw] grid grid-cols-4 gap-[0.8cqw]">
            {dias.map((d) => {
              const hoje = d.n === "25";
              return (
                <li
                  key={d.n}
                  className="flex flex-col items-center rounded-[1.2cqw] py-[1cqw]"
                  style={hoje ? { background: VERDETE, color: "#ffffff" } : { background: "#f0eeea", color: APAGADO }}
                >
                  <span className="text-[1.2cqw]">{d.dia}</span>
                  <span className="tabular text-[1.9cqw] font-semibold">{d.n}</span>
                </li>
              );
            })}
          </ul>

          <ul className="mt-[2.2cqw] flex flex-col gap-[1cqw]">
            {consultas.map((c) => {
              const agora = c.estado === "agora";
              return (
                <li
                  key={c.hora}
                  className="grid grid-cols-[5cqw_1fr] items-center gap-[1cqw] rounded-[1.4cqw] px-[1.2cqw] py-[1.2cqw]"
                  style={agora ? { background: "#e3f1ee" } : undefined}
                >
                  <span className="tabular font-mono text-[1.3cqw]" style={{ color: agora ? VERDETE : APAGADO }}>
                    {c.hora}
                  </span>
                  <span className="min-w-0">
                    <span className={`flex items-center gap-[0.8cqw] truncate text-[1.6cqw] font-medium ${c.estado === "feita" ? "line-through opacity-50" : ""}`}>
                      {c.nome}
                      {agora && (
                        <motion.span
                          className="size-[1cqw] shrink-0 rounded-full"
                          style={{ background: VERDETE }}
                          animate={{ opacity: [1, 0.25, 1] }}
                          transition={{ duration: 1.4, repeat: Infinity }}
                        />
                      )}
                    </span>
                    <span className="block truncate text-[1.3cqw]" style={{ color: APAGADO }}>
                      {c.tipo}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </Camada>

      <Camada profundidade={0.85} className="left-[40%] top-[14%] w-[55%]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2.4cqw] bg-[radial-gradient(80%_80%_at_50%_40%,#3d7f74_0%,#16302b_70%,#0f2320_100%)] shadow-[0_5cqw_10cqw_-3cqw_rgba(12,40,34,0.55)]">
          <span className="absolute left-[4%] top-[5%] flex items-center gap-[0.9cqw] rounded-full bg-black/30 px-[1.4cqw] py-[0.7cqw] text-[1.3cqw] text-white backdrop-blur">
            <span className="size-[1cqw] rounded-full bg-[#e5484d]" />
            <span className="tabular">Teleconsulta · 12:48</span>
          </span>

          <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
            <motion.span
              className="absolute inset-0 rounded-full border-[0.35cqw] border-white/40"
              animate={{ scale: [1, 1.35], opacity: [0.8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <span className="relative grid size-[11cqw] place-items-center rounded-full bg-white/15 text-[3.4cqw] font-semibold text-white">RT</span>
          </div>

          <div className="absolute bottom-[5%] right-[4%] grid aspect-[4/3] w-[28%] place-items-center rounded-[1.4cqw] border border-white/15 bg-[linear-gradient(150deg,#b27a4b,#6b4428)] text-[2cqw] font-semibold text-white">
            HM
          </div>

          <div className="absolute bottom-[6%] left-1/2 flex -translate-x-1/2 items-center gap-[1.2cqw]">
            <span className="grid size-[4.4cqw] place-items-center rounded-full bg-white/15">
              <Icone className="w-[2.2cqw]" caminho="M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM19 11a7 7 0 0 1-14 0M12 18v3" />
            </span>
            <span className="grid size-[4.4cqw] place-items-center rounded-full bg-white/15">
              <Icone className="w-[2.2cqw]" caminho="M15 10l5-3v10l-5-3M3 7h12v10H3z" />
            </span>
            <span className="grid size-[4.4cqw] place-items-center rounded-full bg-[#e5484d]">
              <Icone className="w-[2.2cqw]" caminho="M4 14c4.5-4 11.5-4 16 0l-2 3-3-1v-2.5a9 9 0 0 0-6 0V16l-3 1z" />
            </span>
          </div>
        </div>
      </Camada>

      <Camada profundidade={1.35} className="bottom-[8%] left-[33%] w-[36%]">
        <Flutuar amplitude={7} duracao={4.8}>
          <div className="flex items-center gap-[1.6cqw] rounded-[2.2cqw] bg-white p-[1.9cqw] shadow-[0_3cqw_6cqw_-2cqw_rgba(12,40,34,0.45)]">
            <span className="grid size-[4.6cqw] shrink-0 place-items-center rounded-full" style={{ background: BRONZE }}>
              <Icone className="w-[2.4cqw]" caminho="M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-[1.8cqw] font-semibold">Receita enviada</span>
              <span className="block truncate text-[1.45cqw]" style={{ color: APAGADO }}>
                para R. Tavares
              </span>
            </span>
          </div>
        </Flutuar>
      </Camada>
    </div>
  );
}
