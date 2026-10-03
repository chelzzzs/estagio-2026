import { MotionConfig } from "motion/react";
import { Abertura } from "./components/Abertura";
import { Quarto } from "./components/Quarto";

export function App() {
  return (
    <MotionConfig reducedMotion="user">
      <Quarto />
      <main id="topo" className="pointer-events-none relative z-10 mx-auto max-w-[90rem] px-5 md:px-8">
        <Abertura />
        <div aria-hidden className="h-[300vh]" />
      </main>
    </MotionConfig>
  );
}
