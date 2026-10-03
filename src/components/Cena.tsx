import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import fundo from "../assets/fundo.webp";
import { pontos, type Ponto, type PontoId } from "../data/pontos";
import { Escuridao, Luminaria } from "./cena/Luz";
import { MonitorCodigo } from "./cena/MonitorCodigo";
import { Poeira } from "./cena/Poeira";
import { Soneca } from "./cena/Soneca";
import { origemDe, type Origem } from "./Sobreposicao";

const ESCALA_PONTO = 0.06;

const PROPORCAO = 816 / 1440;

function Marcador({
  ponto,
  ordem,
  ativo,
  pausado,
  onAbrir,
}: {
  ponto: Ponto;
  ordem: number;
  ativo: boolean;
  pausado: boolean;
  onAbrir: (id: PontoId, origem: Origem) => void;
}) {
  const esquerda = ponto.lado === "esquerda";

  return (
    <div
      className="absolute left-[var(--x-celular)] top-[var(--y-celular)] sm:left-[var(--x)] sm:top-[var(--y)]"
      style={
        {
          "--x": `${ponto.x}%`,
          "--y": `${ponto.y}%`,
          "--x-celular": `${ponto.celular?.x ?? ponto.x}%`,
          "--y-celular": `${ponto.celular?.y ?? ponto.y}%`,
        } as CSSProperties
      }
    >
      <button
        type="button"
        onClick={(e) =>
          onAbrir(ponto.id, origemDe(e.currentTarget, ESCALA_PONTO))
        }
        aria-label={`${ponto.nome}: abrir`}
        aria-haspopup="dialog"
        className="surgir group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
        style={{ "--atraso": `${1.2 + ordem * 0.12}s` } as CSSProperties}
      >
        <motion.span
          className="relative block"
          initial={false}
          animate={{ opacity: ativo ? 0 : 1 }}
          transition={ativo ? { duration: 0 } : { duration: 0.2, delay: 0.24 }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-0 rounded-full border-2 border-accent"
            animate={pausado ? { scale: 1, opacity: 0 } : { scale: [1, 1.12, 1.9], opacity: [0, 0.65, 0] }}
            transition={pausado ? { duration: 0 } : { duration: 2.2, times: [0, 0.18, 1], ease: "easeOut", repeat: Infinity, repeatDelay: 0.4 }}
          />
          <span className="relative grid size-11 place-items-center rounded-full bg-accent text-[0.95rem] font-semibold text-[#1a120c] shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-transform group-hover:scale-110">
            {ponto.numero}
          </span>
          <span
            className={`absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-[#120d09]/78 px-3 py-1.5 text-center transition-colors group-hover:bg-[#120d09]/92 sm:top-1/2 sm:mt-0 sm:-translate-y-1/2 sm:translate-x-0 sm:px-4 sm:py-2 sm:text-left ${esquerda ? "sm:left-auto sm:right-full sm:mr-3" : "sm:left-full sm:ml-3"}`}
          >
            <span className="block text-[0.85rem] font-medium leading-tight text-ink sm:text-[0.95rem]">
              {ponto.nome}
            </span>
            <span className="legenda hidden leading-tight sm:block">
              {ponto.objeto}
            </span>
          </span>
        </motion.span>
      </button>
    </div>
  );
}

export function Cena({
  abertoId,
  onAbrir,
}: {
  abertoId: PontoId | null;
  onAbrir: (id: PontoId, origem: Origem) => void;
}) {
  const imagem = useRef<HTMLImageElement>(null);
  const [curso, setCurso] = useState(0);
  const [acesa, setAcesa] = useState(true);
  const reduzir = useReducedMotion();

  const medir = useCallback(() => {
    const el = imagem.current;
    if (el) setCurso(Math.max(0, el.offsetHeight - window.innerHeight));
  }, []);

  useEffect(() => {
    medir();
    window.addEventListener("resize", medir);
    return () => window.removeEventListener("resize", medir);
  }, [medir]);

  const { scrollYProgress } = useScroll();
  const suave = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.35,
  });
  const y = useTransform(suave, (v) => (reduzir ? 0 : -v * curso));
  const escala = useTransform(suave, [0, 1], reduzir ? [1, 1] : [1.12, 1]);
  const veu = useTransform(suave, [0, 0.1, 1], [0.14, 0.32, 0.4]);

  return (
    <div className="cena-entrada pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg">
      <motion.div
        className="@container absolute left-1/2 top-0 -translate-x-1/2"
        style={{
          width: `max(100vw, calc(135vh * ${PROPORCAO}))`,
          y,
          scale: escala,
          transformOrigin: "50% 0%",
          willChange: "transform",
        }}
      >
        <img
          ref={imagem}
          src={fundo}
          alt=""
          aria-hidden
          onLoad={medir}
          draggable={false}
          className="block w-full max-w-none select-none"
        />
        <motion.div
          aria-hidden
          className="absolute inset-0 bg-[#0b0806]"
          style={{ opacity: veu }}
        />
        <Poeira pausado={abertoId !== null} />
        <Escuridao acesa={acesa} />
        <MonitorCodigo pausado={abertoId !== null} />
        <Soneca pausado={abertoId !== null} />
        <Luminaria acesa={acesa} onAlternar={() => setAcesa((v) => !v)} />
        <div className="absolute inset-0">
          {pontos.map((ponto, ordem) => (
            <Marcador
              ordem={ordem}
              key={ponto.id}
              ponto={ponto}
              ativo={abertoId === ponto.id}
              pausado={abertoId !== null}
              onAbrir={onAbrir}
            />
          ))}
        </div>
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(130%_85%_at_50%_45%,transparent_45%,rgba(4,6,5,0.5)_100%)]"
      />
    </div>
  );
}
