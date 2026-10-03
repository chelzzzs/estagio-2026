import type { ReactNode } from "react";
import { FlipCard } from "./FlipCard";

export function CartaoTexto({ children }: { children: ReactNode }) {
  return (
    <FlipCard
      autoHeight
      flipOnClick={false}
      draggable={false}
      background="#120d09"
      color="#f4f3ef"
      radius={22}
      tiltMax={6}
      hoverScale={1.02}
      front={<div className="size-full rounded-[inherit] border border-white/10 px-6 py-8 md:px-10 md:py-10">{children}</div>}
    />
  );
}
