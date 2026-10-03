import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { projetos, type Projeto } from "../data/projetos";
import { FlipCard } from "./FlipCard";
import { ArteDoProjeto } from "./projetos/ArteDoProjeto";
import { Comparador } from "./projetos/Comparador";
import { MarcaDoProjeto } from "./projetos/MarcaDoProjeto";
import { origemDe, Sobreposicao, type Origem } from "./Sobreposicao";

function Capa({ projeto }: { projeto: Projeto }) {
  return (
    <div
      className="@container absolute inset-0"
      style={{ background: projeto.fundo }}
    >
      <ArteDoProjeto projeto={projeto} />
    </div>
  );
}

function Frente({ projeto }: { projeto: Projeto }) {
  return (
    <div className="flex size-full flex-col">
      <div className="relative flex-1 overflow-hidden">
        <MarcaDoProjeto projeto={projeto} />
      </div>
      <div className="flex items-end justify-between gap-3 px-5 pb-5 pt-4">
        <div>
          <h3 className="display text-[1.45rem]">{projeto.nome}</h3>
          <p className="legenda mt-1.5">{projeto.tipo}</p>
        </div>
        <span
          className="grid size-9 shrink-0 place-items-center rounded-full border border-line text-muted"
          aria-hidden
        >
          <svg
            viewBox="0 0 24 24"
            className="size-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </svg>
        </span>
      </div>
    </div>
  );
}

function Verso({ projeto }: { projeto: Projeto }) {
  return (
    <div
      className="flex size-full flex-col p-5 md:p-6"
      style={{
        background: `linear-gradient(180deg, rgba(18,13,9,0.82), rgba(18,13,9,0.96)), ${projeto.fundo}`,
      }}
    >
      <p className="legenda">{projeto.tipo}</p>
      <h3 className="display mt-2 text-[1.45rem]">{projeto.nome}</h3>
      <p className="mt-3 text-[0.9rem] leading-snug text-muted">
        {projeto.descricao}
      </p>
      <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-[0.85rem] leading-snug">
        {projeto.detalhes.map((item) => (
          <li key={item} className="flex gap-2.5">
            <span className="mt-[0.5em] size-1.5 shrink-0 rounded-full bg-accent" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="legenda mt-auto pt-4 text-ink">Clique para abrir</p>
    </div>
  );
}

function Detalhe({
  projeto,
  origem,
  onFechar,
}: {
  projeto: Projeto;
  origem: Origem;
  onFechar: () => void;
}) {
  const [aba, setAba] = useState<"tela" | "evolucao">("tela");

  return (
    <Sobreposicao origem={origem} rotulo={projeto.nome} onFechar={onFechar}>
      <div className="relative aspect-[16/9] overflow-hidden">
        {aba === "evolucao" && projeto.comparar ? (
          <div
            className="absolute inset-0 grid place-items-center p-[4%]"
            style={{ background: projeto.fundo }}
          >
            <Comparador
              antes={projeto.comparar.antes}
              agora={projeto.comparar.agora}
              nome={projeto.nome}
            />
          </div>
        ) : (
          <Capa projeto={projeto} />
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { delay: 0.12, duration: 0.35 },
        }}
        exit={{ opacity: 0, transition: { duration: 0.1 } }}
        className="grid gap-8 p-6 md:grid-cols-[1.1fr_1fr] md:p-8"
      >
        <div>
          <p className="legenda">{projeto.tipo}</p>
          <h3 className="display mt-3 text-[clamp(2rem,4vw,3rem)]">
            {projeto.nome}
          </h3>
          <p className="mt-4 max-w-[42ch] text-muted">{projeto.descricao}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {projeto.tags.map((tag) => (
              <li
                key={tag}
                className="legenda rounded-full border border-line px-3 py-1 text-ink"
              >
                {tag}
              </li>
            ))}
          </ul>
          {projeto.comparar && (
            <div
              className="mt-6 inline-flex rounded-full border border-line p-1"
              role="tablist"
              aria-label="Imagem"
            >
              {(["tela", "evolucao"] as const).map((valor) => (
                <button
                  key={valor}
                  type="button"
                  role="tab"
                  aria-selected={aba === valor}
                  onClick={() => setAba(valor)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${aba === valor ? "bg-ink text-bg" : "text-muted hover:text-ink"}`}
                >
                  {valor === "tela" ? "Tela atual" : "Evolução"}
                </button>
              ))}
            </div>
          )}
        </div>

        <ul className="flex flex-col gap-3 border-t border-line pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
          {projeto.detalhes.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </Sobreposicao>
  );
}

function escalaDoCartao(alvo: HTMLElement) {
  const painel = Math.min(window.innerWidth - 32, 1024);
  return Math.min(
    1,
    Math.max(0.1, alvo.getBoundingClientRect().width / painel),
  );
}

export function Projetos() {
  const [aberto, setAberto] = useState<{ id: string; origem: Origem } | null>(
    null,
  );
  const atual = projetos.find((p) => p.id === aberto?.id);

  return (
    <>
      <p className="legenda">Arraste para virar · clique para abrir</p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {projetos.map((projeto) => (
          <FlipCard
            key={projeto.id}
            ratio="3 / 4"
            ariaLabel={`${projeto.nome}: abrir detalhes`}
            background="#120d09"
            color="#f4f3ef"
            radius={22}
            onPress={(alvo) =>
              setAberto({
                id: projeto.id,
                origem: origemDe(alvo, escalaDoCartao(alvo)),
              })
            }
            front={<Frente projeto={projeto} />}
            back={<Verso projeto={projeto} />}
          />
        ))}
      </div>

      <AnimatePresence>
        {atual && (
          <Detalhe
            key={atual.id}
            projeto={atual}
            origem={aberto!.origem}
            onFechar={() => setAberto(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
