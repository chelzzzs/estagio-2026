import { animate, motion, useMotionValue, useTransform, type MotionValue } from "motion/react";
import { useEffect } from "react";
import { etapas } from "../data/rotacao";
import { usePainelPronto } from "./Sobreposicao";

type Lado = "cima" | "cimaEsquerda" | "baixo" | "cume";

const LARGURA = 1200;
const ALTURA = 640;

const SERRA = "M0 640 L0 470 C200 420 300 380 420 350 C520 325 600 250 720 210 C800 185 860 210 920 230 C1000 250 1100 280 1200 250 L1200 640 Z";
const MONTANHA = "M0 640 L0 540 C150 520 250 450 380 410 C480 380 560 310 650 280 C760 240 900 150 1040 70 C1090 100 1140 150 1200 200 L1200 640 Z";
const NEVE = "M996 108 L1040 70 L1084 98 L1064 104 L1050 93 L1034 108 L1018 99 Z";
const CAMINHO =
  "M40 610 C80 600 90 572 110 560 C200 512 300 528 380 470 C450 420 520 410 560 395 C600 380 590 372 620 360 C700 330 760 300 790 280 C815 263 820 258 840 250 C920 212 980 170 1040 110";
const SOL = { x: 230, y: 150, r: 48 };

const MARCOS: { x: number; y: number; t: number; lado: Lado }[] = [
  { x: 110, y: 560, t: 0.05, lado: "cima" },
  { x: 380, y: 470, t: 0.32, lado: "baixo" },
  { x: 620, y: 360, t: 0.56, lado: "cimaEsquerda" },
  { x: 840, y: 250, t: 0.78, lado: "baixo" },
  { x: 1040, y: 110, t: 0.99, lado: "cume" },
];

const ACCENT = "#e9a85a";
const VERMELHO = "#d9573a";

const POSICAO: Record<Lado, string> = {
  cima: "-translate-x-[40%] -translate-y-[calc(100%+2.75rem)]",
  cimaEsquerda: "-translate-x-[calc(100%-1rem)] -translate-y-[calc(100%+1.25rem)] text-right",
  baixo: "-translate-x-[10%] translate-y-7",
  cume: "-translate-x-[calc(100%+3.5rem)] -translate-y-[90%] text-right",
};

const pct = (x: number, y: number) => ({ left: `${(x / LARGURA) * 100}%`, top: `${(y / ALTURA) * 100}%` });

function Marco({ x, y, t, progresso, cume }: { x: number; y: number; t: number; progresso: MotionValue<number>; cume: boolean }) {
  const preenchido = useTransform(progresso, (v) => (v >= t ? ACCENT : "#0b0806"));
  const halo = useTransform(progresso, (v) => (v >= t ? 0.18 : 0));

  return (
    <g>
      <motion.circle cx={x} cy={y} r={cume ? 22 : 18} fill={ACCENT} style={{ opacity: halo }} />
      <motion.circle cx={x} cy={y} r={cume ? 10 : 8} stroke={ACCENT} strokeWidth="3" style={{ fill: preenchido }} />
      {cume && (
        <g>
          <line x1={x} y1={y - 10} x2={x} y2={y - 58} stroke="#f4f3ef" strokeWidth="2.5" strokeLinecap="round" />
          <path d={`M${x} ${y - 58} L${x + 30} ${y - 48} L${x} ${y - 38} Z`} fill={VERMELHO} />
        </g>
      )}
    </g>
  );
}

function Rotulo({ indice }: { indice: number }) {
  const etapa = etapas[indice];
  return (
    <>
      <span className="legenda tabular">{String(indice + 1).padStart(2, "0")}</span>
      <h3 className="sombra mt-1 font-jp text-[clamp(1.4rem,2.3vw,2.2rem)] leading-tight">{etapa.area}</h3>
      <p className="sombra mt-1.5 text-[0.9rem] leading-snug text-muted">{etapa.resumo}</p>
      {etapa.atual && <span className="legenda mt-3 inline-block rounded-full bg-accent px-3 py-1 text-[#1a120c]">Hoje</span>}
    </>
  );
}

function Mapa({ progresso }: { progresso: MotionValue<number> }) {
  return (
    <div className="relative" style={{ aspectRatio: `${LARGURA} / ${ALTURA}` }}>
      <svg viewBox={`0 0 ${LARGURA} ${ALTURA}`} className="absolute inset-0 size-full overflow-visible" aria-hidden>
        <circle cx={SOL.x} cy={SOL.y} r={SOL.r} fill={VERMELHO} opacity="0.85" />
        <path d={SERRA} fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
        <path d={MONTANHA} fill="rgba(20,15,11,0.92)" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinejoin="round" />
        <path d={NEVE} fill="rgba(244,243,239,0.85)" />
        <path d={CAMINHO} fill="none" stroke="rgba(244,243,239,0.35)" strokeWidth="3" strokeDasharray="2 12" strokeLinecap="round" />
      </svg>
      <svg viewBox={`0 0 ${LARGURA} ${ALTURA}`} className="absolute inset-0 size-full overflow-visible" style={{ willChange: "transform" }} aria-hidden>
        <motion.path d={CAMINHO} fill="none" stroke={ACCENT} strokeWidth="4" strokeLinecap="round" style={{ pathLength: progresso }} />
        {MARCOS.map((m, i) => (
          <Marco key={i} {...m} progresso={progresso} cume={i === MARCOS.length - 1} />
        ))}
      </svg>

      <ol className="absolute inset-0 hidden lg:block">
        {MARCOS.map((m, i) => (
          <li key={etapas[i].area} className={`absolute w-[15rem] ${POSICAO[m.lado]}`} style={pct(m.x, m.y)}>
            <Rotulo indice={i} />
          </li>
        ))}
      </ol>

      <div aria-hidden className="absolute inset-0 lg:hidden">
        {MARCOS.map((m, i) => (
          <span key={i} className="legenda tabular absolute -translate-x-1/2 -translate-y-[calc(100%+0.9rem)] text-ink" style={pct(m.x, m.y)}>
            {String(i + 1).padStart(2, "0")}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LinhaDoTempo() {
  const progresso = useMotionValue(0);

  const pronto = usePainelPronto();

  useEffect(() => {
    if (!pronto) return;
    const controle = animate(progresso, 1, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    return () => controle.stop();
  }, [pronto, progresso]);

  return (
    <>
      <Mapa progresso={progresso} />
      <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:hidden">
        {etapas.map((etapa, i) => (
          <li key={etapa.area}>
            <Rotulo indice={i} />
          </li>
        ))}
      </ol>
    </>
  );
}
