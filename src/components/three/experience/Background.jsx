import { useTexture } from "@react-three/drei";
import * as THREE from "three";

export default function Background() {
  const map = useTexture("/img/neuron1.jpg");
  return (
    <mesh position={[0, 80, 0]} rotation={[0, Math.PI / 2, 0]}>
      <sphereGeometry args={[100, 128, 128]} />
      <meshStandardMaterial fog={false} map={map} side={THREE.BackSide} />
    </mesh>
  );
}
