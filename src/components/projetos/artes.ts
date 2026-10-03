import type { ComponentType } from "react";
import type { Arte } from "../../data/projetos";
import { ClicklarIlustracao } from "./ClicklarIlustracao";
import { DocIlustracao } from "./DocIlustracao";
import { LabsIlustracao } from "./LabsIlustracao";
import { MordomoIlustracao } from "./MordomoIlustracao";
import { SegurancaIlustracao } from "./SegurancaIlustracao";

export const artes: Record<Arte, ComponentType> = {
  labs: LabsIlustracao,
  doc: DocIlustracao,
  mordomo: MordomoIlustracao,
  clicklar: ClicklarIlustracao,
  seguranca: SegurancaIlustracao,
};
