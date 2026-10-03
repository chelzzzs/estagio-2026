export type PontoMensal = { mes: string; valor: number };
export type Fatia = { nome: string; valor: number };

export const destaquesNumericos = [
  { valor: "90", rotulo: "Chamados atendidos", nota: "abril a julho" },
  { valor: "3", rotulo: "Avaliações criadas no Tasy", nota: "mais 6 atualizadas" },
  { valor: "21", rotulo: "Entregas registradas", nota: "abril a junho" },
  { valor: "4", rotulo: "Projetos no desenvolvimento", nota: "julho a setembro" },
];

export const chamadosPorMes: PontoMensal[] = [
  { mes: "Abr", valor: 12 },
  { mes: "Mai", valor: 23 },
  { mes: "Jun", valor: 35 },
  { mes: "Jul", valor: 20 },
];

export const commitsPorMes: PontoMensal[] = [
  { mes: "Jul", valor: 18 },
  { mes: "Ago", valor: 43 },
  { mes: "Set", valor: 115 },
];

export const beneficiados: Fatia[] = [
  { nome: "IOP", valor: 10 },
  { nome: "Corporativo", valor: 5 },
  { nome: "Grupo todo", valor: 4 },
  { nome: "Santé", valor: 1 },
];

export const coresBeneficiados = ["#3987e5", "#d95926", "#199e70", "#c98500"];
