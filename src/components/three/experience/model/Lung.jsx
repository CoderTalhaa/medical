import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Lung(props) {
  const { nodes, materials } = useGLTF("/models/lung.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Mesh_0.geometry}
        material={materials.Material_0}
      />
    </group>
  );
}

useGLTF.preload("/models/lung.glb");
