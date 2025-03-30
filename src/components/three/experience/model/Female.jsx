import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Female(props) {
  const { nodes, materials } = useGLTF("/models/female.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.utrus.geometry}
        material={materials.utrus}
        position={[0, 0.914, 0]}
        scale={1.201}
      />
    </group>
  );
}

useGLTF.preload("/models/female.glb");
