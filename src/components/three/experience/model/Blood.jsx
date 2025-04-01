import React, { useRef } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import useModelStore from "@/store/useStore";
import { Info } from "lucide-react";
import { bloodData } from "@/data/bloodData.js";

export function Blood(props) {
  const { nodes, materials } = useGLTF("/models/steam.glb");
  const bloodRefs = useRef([]);

  const { setContent } = useModelStore();

  const handleClick = () => {
    setContent(bloodData);
  };

  useFrame(() => {
    bloodRefs.current.forEach((ref) => {
      if (ref) ref.rotation.y += 0.02;
    });
  });

  return (
    <>
      <group {...props} dispose={null}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes._vessel.geometry}
          material={materials.vessel}
          position={[0.919, 2.049, -3.797]}
        />
        {Object.keys(nodes).map((key, i) => {
          if (key.startsWith("blood")) {
            return (
              <mesh
                key={key}
                ref={(el) => (bloodRefs.current[i] = el)}
                castShadow
                receiveShadow
                geometry={nodes[key].geometry}
                material={materials.blood}
                position={nodes[key].position}
                rotation={nodes[key].rotation}
                scale={nodes[key].scale || 0.184}
              />
            );
          }
          return null;
        })}
      </group>
      <Html
        position={[0.919, 2.049, -3.797]}
        rotation={[0, 1, 0]}
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

useGLTF.preload("/models/steam.glb");
