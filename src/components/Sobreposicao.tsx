import { motion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";

export const MOLA = { type: "spring", stiffness: 320, damping: 32, mass: 0.9 } as const;

export type Origem = { x: number; y: number; escala: number };

const SUMIR = { duration: 0.24, ease: [0.4, 0, 1, 1] as const, opacity: { duration: 0.16 } };

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

  const fora = origem ? { opacity: 0, scale: origem.escala, x: origem.x, y: origem.y } : { opacity: 0, scale: 0.96, x: 0, y: 16 };

  return createPortal(
    <div className="fixed inset-0 z-50 grid place-items-center p-4">
      <motion.div
        className="absolute inset-0 bg-[#0b0806]/55 backdrop-blur-[3px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.24 } }}
        onClick={onFechar}
      />

      <motion.div
        initial={fora}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0, transition: { ...MOLA, opacity: { duration: 0.18 } } }}
        exit={{ ...fora, transition: SUMIR }}
        role="dialog"
        aria-modal="true"
        aria-label={rotulo}
        className="relative max-h-[90vh] overflow-y-auto rounded-[28px] border border-white/10 bg-[#120d09]/95 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)]"
        style={{ width: `min(100%, ${largura})` }}
      >
        <button
          type="button"
          onClick={onFechar}
          aria-label="Fechar"
          className="absolute right-4 top-4 z-10 grid size-10 border border-white/10 bg-white/10 place-items-center rounded-full text-ink transition-colors hover:bg-ink hover:text-bg"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        {children}
      </motion.div>
    </div>,
    document.body,
  );
}
