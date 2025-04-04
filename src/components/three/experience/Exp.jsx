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
    brain: [20, 1.4, -3],
    heart: [1, 0, 20],
    lung: [-20, 0.5, 10],
    blood: [-10, 0.3, -20],
  };

  const organPositions = [
    [1, 1, 20], // Heart
    [20, 1, -3], // Brain
    [-20, 1, 10], // Lung
    [10, 1, -20], // Female
    [-10, 1, -20], // Blood
  ];

  const { updateSound } = useAudio(modelPositions);

  useFrame(({ camera }) => {
    updateSound(camera);
  });

  return (
    <>
      {Array.from({ length: 10000 }).map((_, i) => (
        <mesh key={i} position={[100, 100, 100]}>
          <boxGeometry />
          <meshStandardMaterial color="white" />
        </mesh>
      ))}

      <NeuronParticles positions={organPositions} />

      <group position={modelPositions.brain} rotation={[0, -0.4, 0]}>
        <Brain scale={4} />
      </group>
      <group position={modelPositions.heart}>
        <Heart scale={1.7} />
      </group>
      <group position={modelPositions.lung} rotation={[0, 0.5, 0]}>
        <Lung scale={1.3} />
      </group>
      <group position={[10, 1, -20]}>
        <Female scale={2} />
      </group>
      <group position={modelPositions.blood} rotation={[0, 1.1, 0]}>
        <Blood scale={0.7} />
      </group>
    </>
  );
}
