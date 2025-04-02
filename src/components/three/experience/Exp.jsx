import { useFrame } from "@react-three/fiber";
import { Blood } from "./model/Blood";
import { Brain } from "./model/Brain";
import { Female } from "./model/Female";
import { Heart } from "./model/Heart";
import { Lung } from "./model/Lung";
import useAudio from "@/hooks/useAudio";
import { NeuronParticles } from "./model/NeuronParticles";

export default function Exp() {
  const modelPositions = {
    brain: [15, -1, 0],
    heart: [5, 0, 15],
    lung: [-15, 0.5, 10],
    blood: [5, 0, -35],
  };

  const organPositions = [
    [15, 1, 0], // Brain
    [5, 1, 15], // Heart
    [-15, 1, 10], // Lung
    [-12, 1, -10], // Female
    [5, 1, -35], // Blood
  ];

  const { updateSound } = useAudio(modelPositions);

  useFrame(({ camera }) => {
    updateSound(camera);
  });

  return (
    <>
      <NeuronParticles positions={organPositions} />

      <group position={modelPositions.brain}>
        <Brain scale={5} />
      </group>
      <group position={modelPositions.heart}>
        <Heart scale={1.7} />
      </group>
      <group position={modelPositions.lung} scale={1}>
        <Lung />
      </group>
      <group position={[-12, 1, -10]} scale={1.5}>
        <Female />
      </group>
      <group
        position={modelPositions.blood}
        rotation={[0, Math.PI / 1.7, 0]}
        scale={1}
      >
        <Blood />
      </group>
    </>
  );
}
