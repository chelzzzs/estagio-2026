import { AnimatePresence, motion } from "motion/react";
import { lazy, Suspense, useState, type ReactNode } from "react";
import { pontos, type PontoId } from "../data/pontos";
import { Cena } from "./Cena";
import { Projetos } from "./Desenvolvimento";
import { Indice } from "./Indice";
import { LinhaDoTempo } from "./LinhaDoTempo";
import { ProximosPassos } from "./ProximosPassos";
import { Introducao } from "./Rotacao";
import { Sobreposicao, type Origem } from "./Sobreposicao";

const Numeros = lazy(() => import("./Numeros").then((modulo) => ({ default: modulo.Numeros })));

const conteudos: Record<PontoId, () => ReactNode> = {
  introducao: () => <Introducao />,
  "linha-do-tempo": () => <LinhaDoTempo />,
  projetos: () => <Projetos />,
  numeros: () => (
    <Suspense fallback={<p className="legenda min-h-[60vh]">Carregando os gráficos…</p>}>
      <Numeros />
    </Suspense>
  ),
  "proximos-passos": () => <ProximosPassos />,
};

type Aberto = { id: PontoId; origem?: Origem };

export function Quarto() {
  const [aberto, setAberto] = useState<Aberto | null>(null);
  const ponto = pontos.find((p) => p.id === aberto?.id);

  return (
    <>
      <Cena
        abertoId={aberto?.id ?? null}
        onAbrir={(id, origem) => setAberto({ id, origem })}
      />
      <Indice onAbrir={(id) => setAberto({ id })} />

      <AnimatePresence>
        {aberto && ponto && (
          <Sobreposicao
            key={ponto.id}
            origem={aberto.origem}
            rotulo={ponto.titulo}
            largura={ponto.largura}
            onFechar={() => setAberto(null)}
          >
            <motion.div
              className="p-5 pt-6 sm:p-6 sm:pt-7 md:p-10"
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { delay: 0.12, duration: 0.3 },
              }}
              exit={{ opacity: 0, transition: { duration: 0.1 } }}
            >
              <p className="legenda">
                Ponto {ponto.numero} · {ponto.objeto}
              </p>
              <h2 className="mt-2 pr-14 font-jp text-[clamp(2rem,4vw,3.4rem)] leading-[1.05]">
                {ponto.titulo}
              </h2>
              <div className="mt-8">{conteudos[ponto.id]()}</div>
            </motion.div>
          </Sobreposicao>
        )}
      </AnimatePresence>
    </>
  );
}
