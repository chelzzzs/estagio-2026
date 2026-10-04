import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { type CSSProperties, createContext, useContext, type PointerEvent, type ReactNode } from "react";

type Eixos = { x: MotionValue<number>; y: MotionValue<number> };

const ParalaxeContexto = createContext<Eixos | null>(null);

export function useParalaxe() {
  const brutoX = useMotionValue(0);
  const brutoY = useMotionValue(0);
  const x = useSpring(brutoX, { stiffness: 140, damping: 18 });
  const y = useSpring(brutoY, { stiffness: 140, damping: 18 });

  function mover(e: PointerEvent<HTMLElement>) {
    const caixa = e.currentTarget.getBoundingClientRect();
    brutoX.set((e.clientX - caixa.left) / caixa.width - 0.5);
    brutoY.set((e.clientY - caixa.top) / caixa.height - 0.5);
  }

  function sair() {
    brutoX.set(0);
    brutoY.set(0);
  }

  return { eixos: { x, y }, mover, sair };
}

export function Paralaxe({ eixos, children }: { eixos: Eixos; children: ReactNode }) {
  return <ParalaxeContexto.Provider value={eixos}>{children}</ParalaxeContexto.Provider>;
}

export function Camada({ profundidade, className, children }: { profundidade: number; className?: string; children: ReactNode }) {
  const eixos = useContext(ParalaxeContexto);
  const neutro = useMotionValue(0);
  const x = useTransform(eixos?.x ?? neutro, (v) => `${v * profundidade * 6}%`);
  const y = useTransform(eixos?.y ?? neutro, (v) => `${v * profundidade * 6}%`);

  return (
    <motion.div className={`absolute ${className ?? ""}`} style={{ x, y }}>
      {children}
    </motion.div>
  );
}

export function Flutuar({ amplitude = 4, duracao = 4, atraso = 0, children, className }: { amplitude?: number; duracao?: number; atraso?: number; children: ReactNode; className?: string }) {
  return (
    <div
      className={`flutuar ${className ?? ""}`}
      style={{ "--flutuar-amplitude": `${amplitude}%`, "--flutuar-duracao": `${duracao}s`, "--flutuar-atraso": `${atraso}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
