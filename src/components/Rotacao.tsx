import { rotacao } from "../data/rotacao";
import { CartaoTexto } from "./CartaoTexto";

export function Introducao() {
  return (
    <CartaoTexto>
      <p className="max-w-[68ch] text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.7]">{rotacao.texto}</p>
    </CartaoTexto>
  );
}
