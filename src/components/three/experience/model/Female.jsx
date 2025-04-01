import React, { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import useModelStore from "@/store/useStore";
import { Info } from "lucide-react";
import { femaleData } from "@/data/femaleData.js";

export function Female(props) {
  const { nodes, materials } = useGLTF("/models/female.glb");
  const { setContent } = useModelStore();

  const handleClick = () => {
    setContent(femaleData);
  };
  return (
    <>
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
      <Html
        position={[0, 1.5, 0]}
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

useGLTF.preload("/models/female.glb");
