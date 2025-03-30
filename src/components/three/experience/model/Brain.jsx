import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Brain(props) {
  const { nodes, materials } = useGLTF("/models/brain.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.material_0}
      />
    </group>
  );
}

useGLTF.preload("/models/brain.glb");
