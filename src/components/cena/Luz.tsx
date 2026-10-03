import { AnimatePresence, motion } from "motion/react";
import escuridao from "../../assets/escuridao.png";
import { areaLuminaria } from "../../data/cena";

export function Escuridao({ acesa }: { acesa: boolean }) {
  return (
    <AnimatePresence>
      {!acesa && (
        <motion.div
          aria-hidden
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ backgroundImage: `url(${escuridao})`, backgroundSize: "100% 100%" }}
        />
      )}
    </AnimatePresence>
  );
}

export function Luminaria({ acesa, onAlternar }: { acesa: boolean; onAlternar: () => void }) {
  return (
    <button
      type="button"
      onClick={onAlternar}
      aria-pressed={!acesa}
      aria-label={acesa ? "Apagar a luminária" : "Acender a luminária"}
      title={acesa ? "Apagar a luz" : "Acender a luz"}
      className="group pointer-events-auto absolute cursor-pointer rounded-[40%] outline-none"
      style={{ left: `${areaLuminaria.left}%`, top: `${areaLuminaria.top}%`, width: `${areaLuminaria.width}%`, height: `${areaLuminaria.height}%` }}
    >
      <span className="absolute inset-[-8%] rounded-[45%] bg-[radial-gradient(closest-side,rgba(255,226,150,0.35),transparent)] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100" />
      <span
        aria-hidden
        className={`absolute left-1/2 top-0 grid size-9 -translate-x-1/2 -translate-y-[70%] place-items-center rounded-full border shadow-[0_8px_24px_rgba(0,0,0,0.5)] transition-[background-color,color,transform] duration-300 group-hover:scale-110 ${acesa ? "border-transparent bg-accent text-[#1a120c]" : "border-white/20 bg-[#120d09]/85 text-ink"}`}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.svg
            key={acesa ? "sol" : "lua"}
            viewBox="0 0 24 24"
            className="size-[18px]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {acesa ? (
              <>
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
              </>
            ) : (
              <path d="M20.5 14.2A8.5 8.5 0 1 1 9.8 3.5a6.6 6.6 0 0 0 10.7 10.7Z" fill="currentColor" fillOpacity="0.15" />
            )}
          </motion.svg>
        </AnimatePresence>
      </span>
    </button>
  );
}
