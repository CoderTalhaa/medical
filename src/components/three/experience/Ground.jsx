import { RigidBody } from "@react-three/rapier";
import { useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

export function Ground() {
  const map = useTexture("/img/ground.jpg");

  useEffect(() => {
    map.repeat.set(3, 3);
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.needsUpdate = true;
  }, []);

  return (
    <RigidBody type="fixed" colliders="cuboid" position={[0, 0, 0]}>
      <mesh visible={true} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 120]} />
        <meshStandardMaterial fog={true} map={map} />
      </mesh>
    </RigidBody>
  );
}
