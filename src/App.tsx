import { MotionConfig } from "motion/react";
import { useEffect } from "react";
import fundo from "./assets/fundo.webp";
import { Abertura } from "./components/Abertura";
import { Quarto } from "./components/Quarto";

const FONTES = ['400 1em "Yuji Syuku"', '400 1em "Geist"', '400 1em "Geist Mono"', '600 1em "Funnel Display"'];
const LIMITE_ESPERA = 2200;

function usarEntrada() {
  useEffect(() => {
    const imagem = new Image();
    imagem.src = fundo;
    const recursos = Promise.all([
      imagem.decode().catch(() => undefined),
      Promise.all(FONTES.map((fonte) => document.fonts.load(fonte))).catch(() => undefined),
    ]);
    const limite = new Promise((resolver) => window.setTimeout(resolver, LIMITE_ESPERA));
    let ativo = true;
    Promise.race([recursos, limite]).then(() => {
      if (ativo) document.documentElement.setAttribute("data-pronto", "");
    });
    return () => {
      ativo = false;
    };
  }, []);
}

export function App() {
  usarEntrada();

  return (
    <MotionConfig reducedMotion="user">
      <Quarto />
      <main id="topo" className="pointer-events-none relative z-10 mx-auto max-w-[90rem] px-5 md:px-8">
        <Abertura />
        <div aria-hidden className="h-[300vh]" />
      </main>
    </MotionConfig>
  );
}
