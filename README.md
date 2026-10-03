# Estágio Executivo 2026 · Michel Zulszeski Cáceres

Apresentação interativa do meu estágio no setor de Tecnologia e Inovação do Grupo Med4U: um quarto ilustrado em que cada ponto abre uma parte da trajetória, dos projetos e das entregas.

React 19 + TypeScript + Tailwind 4 + Motion + TanStack Charts, empacotado com Vite.

```bash
npm install
npm run dev
npm run build
```

O deploy no GitHub Pages roda sozinho a cada push na branch `main`, pelo workflow `.github/workflows/deploy.yml`.

## Onde editar

| O quê | Arquivo |
|---|---|
| Pontos do quarto (posição, nome, título) | `src/data/pontos.ts` |
| Trajetória, linha do tempo | `src/data/rotacao.ts` |
| Projetos | `src/data/projetos.ts` |
| Entregas e gráficos | `src/data/numeros.ts` |
| Próximos passos | `src/data/proximos.ts` |
| Elementos da cena (monitor, luminária, poeira, gato) | `src/data/cena.ts` |
| Cores e fontes | `src/index.css` |
