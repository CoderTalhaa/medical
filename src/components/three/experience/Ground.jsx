import { RigidBody } from "@react-three/rapier";

export function Ground() {
  return (
    <RigidBody type="fixed" position={[0, -0.5, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1000, 1000]} />
        <meshStandardMaterial color="#121212" />
      </mesh>
    </RigidBody>
  );
}
