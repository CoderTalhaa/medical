import { Blood } from "./model/Blood";
import { Brain } from "./model/Brain";
import { Female } from "./model/Female";
import { Heart } from "./model/Heart";
import { Lung } from "./model/Lung";

export default function Exp() {
  return (
    <>
      <group position={[10, 1, 0]}>
        <Brain scale={3} />
      </group>
      <group position={[3.09, 0, 9.51]}>
        <Heart scale={1.7} />
      </group>
      <group position={[-8.09, 0.5, 5.88]} scale={1}>
        <Lung />
      </group>
      <group position={[-8.09, 1, -5.88]} scale={1.5}>
        <Female />
      </group>
      <group
        position={[3.09, 0, -25]}
        rotation={[0, Math.PI / 1.7, 0]}
        scale={1}
      >
        <Blood />
      </group>
    </>
  );
}
