import marcaLabs from "../../assets/m4labs.webp";
import type { Projeto } from "../../data/projetos";
import { LogoMed4u } from "./LogoMed4u";
import { Flutuar } from "./Paralaxe";
import { Escudo } from "./SegurancaIlustracao";

function Brilho({ cor }: { cor: string }) {
  return <span aria-hidden className="absolute left-1/2 top-1/2 size-[95%] -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ background: `radial-gradient(closest-side, ${cor}, transparent)` }} />;
}

export function MarcaDoProjeto({ projeto }: { projeto: Projeto }) {
  return (
    <div className="absolute inset-0 grid place-items-center overflow-hidden" style={{ background: projeto.fundo }}>
      {projeto.marca === "labs" && (
        <>
          <Brilho cor="rgba(120, 140, 255, 0.28)" />
          <Flutuar amplitude={3} duracao={5} className="relative w-[46%]">
            <img src={marcaLabs} alt="M4Labs" draggable={false} decoding="async" className="w-full" />
          </Flutuar>
        </>
      )}
      {projeto.marca === "med4u" && (
        <>
          <Brilho cor="rgba(55, 186, 225, 0.22)" />
          <Flutuar amplitude={3} duracao={5} className="relative w-[72%] text-white">
            <LogoMed4u className="w-full" />
          </Flutuar>
        </>
      )}
      {projeto.marca === "seguranca" && (
        <>
          <Brilho cor="rgba(236, 230, 220, 0.08)" />
          <Flutuar amplitude={3} duracao={5} className="relative w-[34%]">
            <Escudo className="w-full" />
          </Flutuar>
        </>
      )}
    </div>
  );
}
