import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Blood(props) {
  const { nodes, materials } = useGLTF("/models/blood.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath.geometry}
        material={materials["Material.001"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NurbsPath_1.geometry}
        material={materials["Material.002"]}
      />
    </group>
  );
}

useGLTF.preload("/models/blood.glb");
