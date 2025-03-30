import { Blood } from "./model/Blood";
import { Brain } from "./model/Brain";
import { Female } from "./model/Female";
import { Heart } from "./model/Heart";
import { Lung } from "./model/Lung";

export default function Exp() {
  return (
    <>
      <Brain position={[0, 0.7, -5]} scale={2.5} />
      <Heart position={[5, 0.5, -20]} scale={1.5} />
      <Lung position={[20, 1, -25]} scale={2.5} />
      <Blood
        position={[30, 1, -15]}
        scale={2.5}
        rotation={[0, Math.PI / -1.5, 0]}
      />
      <Female position={[33, 1, 10]} scale={2.5} />
    </>
  );
}
