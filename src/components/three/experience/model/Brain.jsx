import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import Annotation from "../Annotation";
import { brainCategories } from "@/data/brainData.js";

export function Brain(props) {
  const { nodes, materials } = useGLTF("/models/brain_optimized.glb");

  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_5.geometry}
          material={materials.material_0}
        />
      </group>
      <Annotation
        position={[0, 5, -3]}
        categoryIndex={0}
        categories={brainCategories}
      />
      <Annotation
        position={[2, 3, -3]}
        categoryIndex={1}
        categories={brainCategories}
      />
      <Annotation
        position={[-2, 3, -3]}
        categoryIndex={2}
        categories={brainCategories}
      />
      <Annotation
        position={[0, 2, -3]}
        categoryIndex={3}
        categories={brainCategories}
      />
    </>
  );
}

useGLTF.preload("/models/brain_optimized.glb");
