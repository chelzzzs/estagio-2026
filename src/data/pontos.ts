export type PontoId = "introducao" | "linha-do-tempo" | "projetos" | "numeros" | "proximos-passos";

export type Ponto = {
  id: PontoId;
  numero: number;
  nome: string;
  curto: string;
  titulo: string;
  objeto: string;
  x: number;
  y: number;
  lado: "direita" | "esquerda";
  largura: string;
};

export const pontos: Ponto[] = [
  {
    id: "linha-do-tempo",
    numero: 1,
    nome: "Linha do tempo",
    curto: "Linha",
    titulo: "Trajetória",
    objeto: "quadro da montanha",
    x: 49.9,
    y: 18.3,
    lado: "direita",
    largura: "80rem",
  },
  {
    id: "introducao",
    numero: 2,
    nome: "Trajetória",
    curto: "Trajetória",
    titulo: "Minha passagem pela TI",
    objeto: "estante de livros",
    x: 5.5,
    y: 39.5,
    lado: "direita",
    largura: "54rem",
  },
  {
    id: "projetos",
    numero: 3,
    nome: "Projetos",
    curto: "Projetos",
    titulo: "Meus Projetos no Desenvolvimento",
    objeto: "monitor com código",
    x: 60.4,
    y: 52.3,
    lado: "direita",
    largura: "84rem",
  },
  {
    id: "numeros",
    numero: 4,
    nome: "Entregas",
    curto: "Entregas",
    titulo: "Entregas",
    objeto: "violão",
    x: 66.2,
    y: 73.5,
    lado: "esquerda",
    largura: "76rem",
  },
  {
    id: "proximos-passos",
    numero: 5,
    nome: "Próximos passos",
    curto: "Próximos",
    titulo: "Como eu gostaria de seguir?",
    objeto: "gato dormindo",
    x: 53.8,
    y: 91.5,
    lado: "direita",
    largura: "54rem",
  },
];
