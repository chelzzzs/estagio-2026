import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { areaMonitor, trechosDeCodigo } from "../../data/cena";

const PALAVRAS = /\b(func|return|if|nil|error|int64|const|function)\b/;
const COMPONENTE = /^<\/?[A-Z]\w*/;
const CHAMADA = /^[A-Za-z_]\w*(?=\()/;
const TOKEN = /(<\/?[A-Z]\w*|[A-Za-z_]\w*|\s+|.)/g;

function cor(token: string, resto: string) {
  if (PALAVRAS.test(token) && token.match(PALAVRAS)?.[0] === token) return "#c792ea";
  if (COMPONENTE.test(token)) return "#82aaff";
  if (CHAMADA.test(token + resto.slice(0, 1))) return "#ffcb6b";
  if (/^[{}()[\]]$/.test(token)) return "#89ddff";
  return "#d6deeb";
}

function Linha({ texto }: { texto: string }) {
  const tokens = texto.match(TOKEN) ?? [];
  let posicao = 0;
  return (
    <>
      {tokens.map((token, i) => {
        posicao += token.length;
        return (
          <span key={i} style={{ color: cor(token, texto.slice(posicao)) }}>
            {token}
          </span>
        );
      })}
    </>
  );
}

export function MonitorCodigo({ pausado }: { pausado: boolean }) {
  const reduzir = useReducedMotion();
  const caixa = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [estado, setEstado] = useState({ trecho: 0, linha: 3, coluna: 0 });
  const ativo = !reduzir && !pausado && visivel;

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;
    const vigia = new IntersectionObserver(([entrada]) => setVisivel(entrada.isIntersecting));
    vigia.observe(el);
    return () => vigia.disconnect();
  }, []);

  useEffect(() => {
    if (!ativo) return;
    let pausa = 0;
    const id = window.setInterval(() => {
      if (pausa > 0) {
        pausa -= 1;
        return;
      }
      setEstado((atual) => {
        const linhas = trechosDeCodigo[atual.trecho];
        const linha = linhas[atual.linha];
        if (linha === undefined) {
          pausa = 45;
          return { trecho: (atual.trecho + 1) % trechosDeCodigo.length, linha: 0, coluna: 0 };
        }
        if (atual.coluna < linha.length) return { ...atual, coluna: atual.coluna + 1 };
        pausa = 6;
        return { ...atual, linha: atual.linha + 1, coluna: 0 };
      });
    }, 45);
    return () => window.clearInterval(id);
  }, [ativo]);

  const linhas = trechosDeCodigo[estado.trecho];
  const visiveis = reduzir ? linhas : linhas.slice(0, estado.linha + 1).map((l, i) => (i === estado.linha ? l.slice(0, estado.coluna) : l));

  return (
    <div
      aria-hidden
      ref={caixa}
      className="absolute overflow-hidden rounded-[0.3cqw] bg-[#141c22] px-[0.6cqw] py-[0.5cqw] font-mono shadow-[0_0_2cqw_rgba(120,220,230,0.25)]"
      style={{ left: `${areaMonitor.left}%`, top: `${areaMonitor.top}%`, width: `${areaMonitor.width}%`, height: `${areaMonitor.height}%`, fontSize: "0.72cqw", lineHeight: "1.02cqw", willChange: "transform", contain: "layout paint" }}
    >
      {visiveis.map((texto, i) => (
        <div key={i} className="flex whitespace-pre">
          <span className="w-[1.4cqw] shrink-0 text-right text-[#4b5d68]">{i + 1}</span>
          <span className="pl-[0.6cqw]">
            <Linha texto={texto} />
            {!reduzir && i === visiveis.length - 1 && <span className={`ml-px inline-block h-[0.85cqw] w-[0.35cqw] translate-y-[0.12cqw] bg-[#d6deeb] ${ativo ? "animate-pulse" : ""}`} />}
          </span>
        </div>
      ))}
    </div>
  );
}
