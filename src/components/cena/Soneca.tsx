import { cabecaGato, letrasSono } from "../../data/cena";

const DURACAO = 3.3;

export function Soneca({ pausado }: { pausado: boolean }) {
  return (
    <div aria-hidden className="absolute" style={{ left: `${cabecaGato.x}%`, top: `${cabecaGato.y}%` }}>
      {letrasSono.map(({ letra, tamanho }, i) => (
        <span
          key={i}
          className="zzz absolute bottom-0 left-0 font-jp leading-none text-ink [text-shadow:0_2px_10px_rgba(0,0,0,0.45)]"
          style={{
            fontSize: `${tamanho}cqw`,
            animationDuration: `${DURACAO}s`,
            animationDelay: `${(i * DURACAO) / letrasSono.length}s`,
            animationPlayState: pausado ? "paused" : "running",
          }}
        >
          {letra}
        </span>
      ))}
    </div>
  );
}
