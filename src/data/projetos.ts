import capaComprasAgora from "../assets/capas/compras-agora.webp";
import capaComprasAntes from "../assets/capas/compras-antes.webp";
import capaComprasPendentes from "../assets/capas/compras-pendentes.webp";
import capaPainelEntrada from "../assets/capas/painel-entrada.webp";
import capaSugestao from "../assets/capas/sugestao.webp";

export type Arte = "labs" | "doc" | "mordomo" | "clicklar" | "seguranca";

export type Marca = "labs" | "med4u" | "seguranca";

export type Projeto = {
  id: string;
  nome: string;
  tipo: string;
  descricao: string;
  detalhes: string[];
  tags: string[];
  arte: Arte;
  marca: Marca;
  fundo: string;
  imagem?: string;
  comparar?: { antes: string; agora: string };
  href?: string;
};

export const projetos: Projeto[] = [
  {
    id: "aprovacao-compras",
    nome: "Aprovação de Compras",
    tipo: "Projeto principal · em fase final",
    descricao: "Os diretores aprovam ou reprovam pedidos de compra direto no app, sem abrir o Tasy.",
    detalhes: [
      "Antes, a aprovação era feita só dentro do Tasy.",
      "Agora cada diretor vê só os pedidos dele, abre os itens e decide com um clique.",
      "Reprovação com motivo escolhido numa lista.",
      "Histórico de decisões com filtros por código, solicitante e período.",
      "Fiz sozinho, do zero, como um novo serviço dentro do M4Labs.",
    ],
    tags: ["Cerca de 2 meses e meio", "2 telas", "Feito sozinho"],
    arte: "labs",
    marca: "labs",
    fundo: "radial-gradient(110% 100% at 20% 0%, #6b4428 0%, #33200f 55%, #170e07 100%)",
    imagem: capaComprasPendentes,
    comparar: { antes: capaComprasAntes, agora: capaComprasAgora },
  },
  {
    id: "painel-entrada",
    nome: "Painel de Entrada",
    tipo: "Tela de TV",
    descricao: "Os números de atendimentos do grupo na tela, atualizados sozinhos.",
    detalhes: [
      "Mostra atendimentos médicos e aplicações realizadas pelo grupo.",
      "Os números são buscados no Tasy e atualizados a cada hora, sem ninguém mexer.",
      "Já está em produção.",
    ],
    tags: ["Automação", "Em produção"],
    arte: "labs",
    marca: "med4u",
    fundo: "radial-gradient(110% 100% at 50% 0%, #17406b 0%, #0b2242 55%, #050f22 100%)",
    imagem: capaPainelEntrada,
  },
  {
    id: "sugestao-melhoria",
    nome: "Sugestão de melhoria",
    tipo: "M4Labs",
    descricao: "Qualquer colaborador manda uma ideia de melhoria sem sair do aplicativo.",
    detalhes: ["Fica no menu do usuário do app.", "Basta escrever a ideia e enviar."],
    tags: ["M4Labs"],
    arte: "labs",
    marca: "labs",
    fundo: "radial-gradient(110% 100% at 30% 0%, #5a3d22 0%, #2a1c10 55%, #120c07 100%)",
    imagem: capaSugestao,
  },
  {
    id: "seguranca",
    nome: "Segurança do sistema",
    tipo: "M4Labs",
    descricao: "Cuidados para manter o sistema e os dados protegidos.",
    detalhes: [
      "Correções no acesso ao banco do Tasy depois de uma revisão de segurança.",
      "Atualizações em cerca de 20 partes do sistema contra falhas conhecidas.",
      "Checagem automática de segurança antes de cada publicação.",
    ],
    tags: ["Segurança"],
    arte: "seguranca",
    marca: "seguranca",
    fundo: "radial-gradient(110% 100% at 50% 0%, #241e19 0%, #110e0b 55%, #070605 100%)",
  },
];
