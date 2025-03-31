import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { brainData } from "@/data/brainData.js";
import useModelStore from "@/store/useStore";

export function Brain(props) {
  const { nodes, materials } = useGLTF("/models/brain.glb");
  const { setContent } = useModelStore();

  const handleClick = () => {
    // Set the entire brainData array as the content
    setContent(brainData);
  };
  return (
    <group {...props} dispose={null} onClick={handleClick}>
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
