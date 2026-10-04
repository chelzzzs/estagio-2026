import { motion } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

export type Origem = { x: number; y: number; escala: number };

const ABRIR = { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const, opacity: { duration: 0.18 } };
const SUMIR = { duration: 0.24, ease: [0.4, 0, 1, 1] as const, opacity: { duration: 0.16 } };
const LIMITE_PRONTO = 700;
const NO_LUGAR = "translate(0px, 0px) scale(1)";

const PainelContexto = createContext(true);

export const usePainelPronto = () => useContext(PainelContexto);

const pilha: symbol[] = [];

export function origemDe(alvo: Element, escala: number): Origem {
  const caixa = alvo.getBoundingClientRect();
  return {
    x: caixa.left + caixa.width / 2 - window.innerWidth / 2,
    y: caixa.top + caixa.height / 2 - window.innerHeight / 2,
    escala,
  };
}

export function Sobreposicao({ origem, rotulo, largura = "64rem", onFechar, children }: { origem?: Origem; rotulo: string; largura?: string; onFechar: () => void; children: ReactNode }) {
  const fechar = useRef(onFechar);
  fechar.current = onFechar;
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    const marca = Symbol(rotulo);
    pilha.push(marca);
    document.documentElement.style.overflow = "hidden";
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape" && pilha[pilha.length - 1] === marca) fechar.current();
    };
    window.addEventListener("keydown", tecla);
    return () => {
      window.removeEventListener("keydown", tecla);
      pilha.splice(pilha.indexOf(marca), 1);
      if (pilha.length === 0) document.documentElement.style.overflow = "";
    };
  }, [rotulo]);

  useEffect(() => {
    const id = window.setTimeout(() => setPronto(true), LIMITE_PRONTO);
    return () => window.clearTimeout(id);
  }, []);

  const fora = origem ? `translate(${origem.x}px, ${origem.y}px) scale(${origem.escala})` : "translate(0px, 16px) scale(0.96)";

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-3 sm:p-4">
      <motion.div
        className="absolute inset-0 bg-[#0b0806]/70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.24 } }}
        onClick={onFechar}
      />

      <motion.div
        initial={{ opacity: 0, transform: fora }}
        animate={{ opacity: 1, transform: NO_LUGAR, transition: ABRIR }}
        exit={{ opacity: 0, transform: fora, transition: SUMIR }}
        onAnimationComplete={() => setPronto(true)}
        role="dialog"
        aria-modal="true"
        aria-label={rotulo}
        className="relative max-h-[90vh] overflow-y-auto rounded-[28px] border border-white/10 bg-[#120d09] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)]"
        style={{ width: `min(100%, ${largura})`, willChange: "transform, opacity" }}
      >
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full border border-white/10 bg-white/10 text-ink transition-colors hover:bg-ink hover:text-bg"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <PainelContexto.Provider value={pronto}>{children}</PainelContexto.Provider>
      </motion.div>
    </div>,
    document.body,
  );
}
