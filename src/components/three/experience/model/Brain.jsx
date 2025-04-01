import React, { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { brainData } from "@/data/brainData.js";
import useModelStore from "@/store/useStore";
import { Info } from "lucide-react";

export function Brain(props) {
  const { nodes, materials } = useGLTF("/models/brain_optimized.glb");
  const { setContent } = useModelStore();

  const handleClick = () => {
    setContent(brainData);
  };
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
      <Html
        position={[0, 1, 0]}
        occlude="blending"
        transform
        geometry={<circleGeometry args={[0.2, 32]} />}
        onClick={handleClick}
      >
        <div className=" ">
          <Info size={15} />
        </div>
      </Html>
    </>
  );
}

useGLTF.preload("/models/brain_optimized.glb");
