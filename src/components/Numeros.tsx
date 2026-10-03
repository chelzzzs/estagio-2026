import { d3Curve, defineChart, dot, lineY, type ChartPoint } from "@tanstack/charts";
import { motion as movimento } from "@tanstack/charts/motion";
import { focusGroupAngle, pie, polar, radialArc } from "@tanstack/charts/polar";
import { RendererChart } from "@tanstack/charts/react/tooltip";
import { text } from "@tanstack/charts/text";
import { tooltip } from "@tanstack/charts/tooltip";
import { scaleLinear, scalePoint } from "d3-scale";
import { curveMonotoneX } from "d3-shape";
import type { CSSProperties } from "react";
import { beneficiados, chamadosPorMes, commitsPorMes, coresBeneficiados, destaquesNumericos, type Fatia, type PontoMensal } from "../data/numeros";

const ACCENT = "#e9a85a";
const FUNDO = "#140f0b";
const TINTA = "#f4f3ef";
const APAGADO = "rgba(244, 243, 239, 0.6)";

const renderizador = movimento({
  initial: "always",
  transition: { type: "spring", stiffness: 170, damping: 18, mass: 1 },
});

const estiloTooltip = {
  "--ts-chart-tooltip-background": "rgba(20, 15, 11, 0.94)",
  "--ts-chart-tooltip-color": TINTA,
  "--ts-chart-tooltip-border": "1px solid rgba(255, 255, 255, 0.12)",
  "--ts-chart-tooltip-border-radius": "0.75rem",
  "--ts-chart-tooltip-shadow": "0 12px 34px rgba(0, 0, 0, 0.5)",
} as CSSProperties;

const tema = { foreground: APAGADO, grid: "rgba(255, 255, 255, 0.08)", background: "transparent" };

function graficoLinha(dados: PontoMensal[], maximo: number, unidade: string) {
  return defineChart(
    {
      marks: [
        lineY(dados, { id: "linha", x: "mes", y: "valor", curve: d3Curve(curveMonotoneX), stroke: ACCENT, strokeWidth: 2.5 }),
        dot(dados, { id: "pontos", x: "mes", y: "valor", r: 6, fill: ACCENT, stroke: FUNDO, strokeWidth: 2 }),
        text(dados, { id: "valores", x: "mes", y: "valor", text: "valor", dy: -16, fill: TINTA, fontSize: 13 }),
      ],
      scales: {
        x: { scale: scalePoint, axis: { line: false, ticks: { size: 0 } } },
        y: { scale: scaleLinear().domain([0, maximo]), grid: true, axis: { line: false, ticks: { size: 0 }, tickLabels: false } },
      },
      margin: { top: 30, right: 40, bottom: 28, left: 40 },
      theme: tema,
    },
    {
      svgAnimation: false,
      focus: "group-x",
      tooltip: {
        use: tooltip,
        anchor: "group-center",
        placement: "auto",
        content: (pontos: readonly ChartPoint<PontoMensal>[]) => ({
          title: String(pontos[0]?.xValue ?? ""),
          rows: pontos
            .filter((p) => p.markId === "pontos")
            .map((p) => ({ label: unidade, value: Number(p.yValue ?? 0).toLocaleString("pt-BR"), color: ACCENT })),
        }),
      },
    },
  );
}

function graficoRosca(dados: Fatia[]) {
  const arcos = pie(dados, { value: "valor", startAngle: Math.PI / 2, endAngle: (-Math.PI * 3) / 2 });
  const nomes = dados.map((d) => d.nome);

  return defineChart(
    {
      marks: [
        polar({
          radiusRatio: 0.8,
          scales: { angle: null, radius: null },
          marks: [
            radialArc(arcos, { id: "fatias", key: "nome", innerRadius: 62, color: "nome", stroke: FUNDO, strokeWidth: 4 }),
            radialArc(arcos.slice(0, 1), {
              id: "fatia-ativa",
              key: "nome",
              innerRadius: 62,
              outerRadius: ({ radius }) => radius + 10,
              color: "nome",
              stroke: FUNDO,
              strokeWidth: 4,
            }),
          ],
        }),
      ],
      scales: { x: null, y: null },
      color: { domain: nomes, range: coresBeneficiados },
      margin: 0,
    },
    {
      svgAnimation: false,
      focus: focusGroupAngle,
      tooltip: {
        use: tooltip,
        anchor: "group-center",
        placement: "auto",
        content: (pontos: readonly ChartPoint<unknown>[]) => {
          const ponto = pontos.find((p) => fatiaDe(p.datum));
          const fatia = ponto && fatiaDe(ponto.datum);
          return fatia ? { title: fatia.nome, rows: [{ label: "Entregas", value: String(fatia.valor), color: ponto.color }] } : { rows: [] };
        },
      },
    },
  );
}

function fatiaDe(datum: unknown): Fatia | undefined {
  if (!datum || typeof datum !== "object") return undefined;
  const fonte = Reflect.get(datum, "data") ?? datum;
  const nome = Reflect.get(fonte, "nome");
  const valor = Reflect.get(fonte, "valor");
  return typeof nome === "string" && typeof valor === "number" ? { nome, valor } : undefined;
}

const chamados = graficoLinha(chamadosPorMes, 45, "Chamados");
const commits = graficoLinha(commitsPorMes, 140, "Commits");
const rosca = graficoRosca(beneficiados);
const totalBeneficiados = beneficiados.reduce((soma, f) => soma + f.valor, 0);

function Cartao({ titulo, nota, children, className = "" }: { titulo: string; nota: string; children: React.ReactNode; className?: string }) {
  return (
    <article className={`min-w-0 rounded-[22px] border border-white/10 bg-white/[0.04] p-5 md:p-6 ${className}`}>
      <h3 className="text-[1.05rem] font-medium">{titulo}</h3>
      <p className="legenda mt-1">{nota}</p>
      <div className="mt-4 min-w-0">{children}</div>
    </article>
  );
}

export function Numeros() {
  return (
    <>
      <p className="legenda">Passe o mouse nos gráficos para ver os valores</p>

      <ul className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {destaquesNumericos.map((d) => (
          <li key={d.rotulo} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-5 md:p-6">
            <p className="font-jp text-[clamp(2.6rem,5vw,4rem)] leading-none text-accent">{d.valor}</p>
            <p className="mt-3 text-[0.95rem] font-medium leading-snug">{d.rotulo}</p>
            <p className="legenda mt-1">{d.nota}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Cartao titulo="Chamados por mês" nota="Abril a julho · rotação pelas áreas">
          <div style={estiloTooltip}>
            <RendererChart definition={chamados} renderer={renderizador} height={240} ariaLabel="Chamados por mês: abril 12, maio 23, junho 35, julho 20" />
          </div>
        </Cartao>
        <Cartao titulo="Ritmo no desenvolvimento" nota="Commits por mês · julho a setembro">
          <div style={estiloTooltip}>
            <RendererChart definition={commits} renderer={renderizador} height={240} ariaLabel="Commits por mês: julho 18, agosto 43, setembro 115" />
          </div>
        </Cartao>
      </div>

      <Cartao titulo="Quem foi beneficiado" nota="Entregas por estabelecimento · abril a junho" className="mt-4">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,18rem)_1fr]">
          <div className="relative mx-auto aspect-square w-full max-w-[18rem]" style={estiloTooltip}>
            <RendererChart definition={rosca} renderer={renderizador} aspectRatio={1} ariaLabel="Entregas por estabelecimento: IOP 10, Corporativo 5, Grupo todo 4, Santé 1" />
            <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
              <div>
                <p className="font-jp text-[2.4rem] leading-none">{totalBeneficiados}</p>
                <p className="legenda mt-1">entregas</p>
              </div>
            </div>
          </div>
          <ul className="grid gap-3">
            {beneficiados.map((f, i) => (
              <li key={f.nome} className="flex items-center gap-3 border-b border-line pb-3 last:border-b-0">
                <span className="size-3 shrink-0 rounded-[4px]" style={{ background: coresBeneficiados[i] }} />
                <span>{f.nome}</span>
                <span className="ml-auto tabular text-muted">{f.valor}</span>
              </li>
            ))}
          </ul>
        </div>
      </Cartao>
    </>
  );
}
