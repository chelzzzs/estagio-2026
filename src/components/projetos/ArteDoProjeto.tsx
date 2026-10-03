import type { Projeto } from "../../data/projetos";
import { artes } from "./artes";
import { Camada } from "./Paralaxe";

export function ArteDoProjeto({ projeto }: { projeto: Projeto }) {
  if (projeto.imagem) {
    return (
      <Camada profundidade={0.6} className="inset-0 grid place-items-center p-[5%]">
        <img
          src={projeto.imagem}
          alt={`Tela do ${projeto.nome}`}
          draggable={false}
          className="max-h-full max-w-full rounded-[1.4cqw] shadow-[0_4cqw_8cqw_-3cqw_rgba(0,0,0,0.75)] ring-1 ring-white/10"
        />
      </Camada>
    );
  }
  const Arte = artes[projeto.arte];
  return <Arte />;
}
