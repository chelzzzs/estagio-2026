import { motion } from "motion/react";
import { cabecalho } from "../data/cabecalho";

const SUAVE = [0.22, 1, 0.36, 1] as const;

export function Abertura() {
  return (
    <section aria-label="Abertura" className="relative flex flex-col pb-12 pt-20 md:pb-16 md:pt-24">
      <h1 className="sombra font-jp font-normal leading-[1.02] tracking-[-0.01em]">
        {cabecalho.titulo.map((linha, i) => (
          <motion.span
            key={linha}
            className="block text-[clamp(2.6rem,7.5vw,7.5rem)]"
            initial={{ y: 28 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: i * 0.12, ease: SUAVE }}
          >
            {linha}
          </motion.span>
        ))}
      </h1>

      <motion.div
        className="mt-8 flex items-center gap-5 md:mt-10"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: SUAVE }}
      >
        <span className="h-px w-12 bg-accent md:w-20" />
        <p className="sombra font-jp text-[clamp(1.3rem,2.8vw,2.5rem)] font-normal tracking-[0.02em] text-ink">{cabecalho.programa}</p>
      </motion.div>

      <p className="sombra legenda mt-6 max-w-[34ch] text-ink md:mt-8">{cabecalho.convite}</p>

      <span
        aria-hidden
        className="absolute right-0 top-20 rounded-[6px] border-2 border-[#d9452b] px-2 py-3 font-jp text-[clamp(0.95rem,1.6vw,1.35rem)] font-normal leading-[1.15] text-[#e8563a] [writing-mode:vertical-rl] md:top-24"
      >
        {cabecalho.selo}
      </span>
    </section>
  );
}
