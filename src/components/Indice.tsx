import { pontos, type PontoId } from "../data/pontos";

export function Indice({ onAbrir }: { onAbrir: (id: PontoId) => void }) {
  return (
    <nav aria-label="Índice" className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <ul className="pointer-events-auto flex border border-white/10 bg-[#120d09]/85 gap-0.5 rounded-full p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:gap-1">
        {pontos.map((p) => (
          <li key={p.id}>
            <button
              type="button"
              onClick={() => onAbrir(p.id)}
              aria-haspopup="dialog"
              aria-label={p.nome}
              className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[0.72rem] text-ink transition-colors hover:bg-white/10 sm:gap-2 sm:px-3.5 sm:py-2 sm:text-sm"
            >
              <span aria-hidden className="grid size-5 place-items-center rounded-full bg-accent text-[0.68rem] font-semibold text-[#1a120c] sm:size-6 sm:text-xs">{p.numero}</span>
              <span className="hidden min-[520px]:inline lg:hidden">{p.curto}</span>
              <span className="hidden lg:inline">{p.nome}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
