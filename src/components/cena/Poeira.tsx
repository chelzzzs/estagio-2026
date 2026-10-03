import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { areaPoeira } from "../../data/cena";

type Particula = { x: number; y: number; vx: number; vy: number; r: number; fase: number };

const QUANTIDADE = 50;
const RAIO_CURSOR = 0.09;
const RESOLUCAO = 0.5;
const TAMANHO_BRILHO = 32;

function criar(): Particula {
  return {
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.00012,
    vy: -0.00006 - Math.random() * 0.00012,
    r: 0.6 + Math.random() * 1.8,
    fase: Math.random() * Math.PI * 2,
  };
}

function criarBrilho() {
  const brilho = document.createElement("canvas");
  brilho.width = TAMANHO_BRILHO;
  brilho.height = TAMANHO_BRILHO;
  const ctx = brilho.getContext("2d");
  if (ctx) {
    const meio = TAMANHO_BRILHO / 2;
    const gradiente = ctx.createRadialGradient(meio, meio, 0, meio, meio, meio);
    gradiente.addColorStop(0, "rgba(255, 244, 214, 1)");
    gradiente.addColorStop(1, "rgba(255, 244, 214, 0)");
    ctx.fillStyle = gradiente;
    ctx.fillRect(0, 0, TAMANHO_BRILHO, TAMANHO_BRILHO);
  }
  return brilho;
}

export function Poeira({ pausado }: { pausado: boolean }) {
  const tela = useRef<HTMLCanvasElement>(null);
  const reduzir = useReducedMotion();
  const pausadoRef = useRef(pausado);
  pausadoRef.current = pausado;
  const controle = useRef<(() => void) | null>(null);

  useEffect(() => controle.current?.(), [pausado]);

  useEffect(() => {
    const canvas = tela.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx || reduzir) return;

    const brilho = criarBrilho();
    const particulas = Array.from({ length: QUANTIDADE }, criar);
    const cursor = { x: -1, y: -1 };
    let quadro = 0;
    let visivel = false;

    const ajustar = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * RESOLUCAO));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * RESOLUCAO));
    };
    const redimensionar = new ResizeObserver(ajustar);
    redimensionar.observe(canvas);
    ajustar();

    const mover = (e: PointerEvent) => {
      if (!visivel) return;
      const caixa = canvas.getBoundingClientRect();
      cursor.x = (e.clientX - caixa.left) / caixa.width;
      cursor.y = (e.clientY - caixa.top) / caixa.height;
    };
    window.addEventListener("pointermove", mover, { passive: true });

    const desenhar = (tempo: number) => {
      const { width, height } = canvas;
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      const proporcao = width / height;
      const escala = width / 900;
      for (const p of particulas) {
        const dx = (p.x - cursor.x) * proporcao;
        const dy = p.y - cursor.y;
        const distancia = Math.hypot(dx, dy);
        if (distancia < RAIO_CURSOR && distancia > 0) {
          const forca = (1 - distancia / RAIO_CURSOR) * 0.0016;
          p.vx += (dx / distancia) * forca;
          p.vy += (dy / distancia) * forca;
        }
        p.vx *= 0.96;
        p.vy = p.vy * 0.96 - 0.000004;
        p.x += p.vx + Math.sin(tempo / 2400 + p.fase) * 0.00005;
        p.y += p.vy;
        if (p.y < -0.02) Object.assign(p, criar(), { y: 1.02 });
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;

        const borda = Math.min(1, p.x * 6, (1 - p.x) * 6, p.y * 4, (1 - p.y) * 3);
        ctx.globalAlpha = Math.max(0, (0.35 + 0.35 * Math.sin(tempo / 900 + p.fase)) * borda);
        const lado = p.r * 6 * escala;
        ctx.drawImage(brilho, p.x * width - lado / 2, p.y * height - lado / 2, lado, lado);
      }
      ctx.globalAlpha = 1;
      if (visivel && !pausadoRef.current) quadro = requestAnimationFrame(desenhar);
    };

    const atualizar = () => {
      cancelAnimationFrame(quadro);
      if (visivel && !pausadoRef.current) quadro = requestAnimationFrame(desenhar);
    };
    controle.current = atualizar;

    const vigia = new IntersectionObserver(([entrada]) => {
      visivel = entrada.isIntersecting;
      atualizar();
    });
    vigia.observe(canvas);

    return () => {
      controle.current = null;
      cancelAnimationFrame(quadro);
      redimensionar.disconnect();
      vigia.disconnect();
      window.removeEventListener("pointermove", mover);
    };
  }, [reduzir]);

  return (
    <canvas
      ref={tela}
      aria-hidden
      className="absolute"
      style={{ left: `${areaPoeira.left}%`, top: `${areaPoeira.top}%`, width: `${areaPoeira.width}%`, height: `${areaPoeira.height}%` }}
    />
  );
}
