import { proximosPassos } from "../data/proximos";
import { CartaoTexto } from "./CartaoTexto";

export function ProximosPassos() {
  return (
    <CartaoTexto>
      <div className="flex max-w-[68ch] flex-col gap-5 text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.7]">
        {proximosPassos.map((paragrafo) => (
          <p key={paragrafo}>{paragrafo}</p>
        ))}
      </div>
    </CartaoTexto>
  );
}
