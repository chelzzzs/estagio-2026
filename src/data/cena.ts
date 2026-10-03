export const areaMonitor = { left: 39.3, top: 52.3, width: 21.1, height: 6.55 };
export const areaLuminaria = { left: 25.4, top: 54.25, width: 10.8, height: 7.75 };
export const areaPoeira = { left: 22, top: 24, width: 58, height: 38 };
export const cabecaGato = { x: 41.5, y: 86.75 };
export const letrasSono = [
  { letra: "z", tamanho: 1.2 },
  { letra: "z", tamanho: 1.6 },
  { letra: "Z", tamanho: 2.1 },
];

export const janela = { x: 49.9, y: 38.9, rx: 30, ry: 15 };
export const telaMonitor = { x: 49.9, y: 55.6, rx: 13, ry: 5 };

export const trechosDeCodigo = [
  [
    "func Aprovar(id int64) error {",
    "  p, err := repo.Buscar(id)",
    "  if err != nil {",
    "    return err",
    "  }",
    "  if !p.PodeAprovar(gestor) {",
    "    return ErrSemPermissao",
    "  }",
    "  return repo.Aprovar(p)",
    "}",
  ],
  [
    "function Pendentes() {",
    "  const { data } = useQuery(fila)",
    "  return (",
    "    <Lista>",
    "      {data?.map((p) => (",
    "        <Pedido key={p.id} {...p} />",
    "      ))}",
    "    </Lista>",
    "  )",
    "}",
  ],
];
