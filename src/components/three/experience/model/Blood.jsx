import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import Annotation from "../Annotation";
import { bloodCategories } from "@/data/bloodData";

export function Blood(props) {
  const { nodes, materials } = useGLTF("/models/steam.glb");
  const bloodRefs = useRef([]);

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
      <Annotation
        rotation={[0, 1.5, 0]}
        position={[-13.2, 2.4, -2.6]}
        categoryIndex={0}
        categories={bloodCategories}
      />
      <Annotation
        rotation={[0, 1.5, 0]}
        position={[-6, 1.2, -2.5]}
        categoryIndex={1}
        categories={bloodCategories}
      />
      <Annotation
        rotation={[0, 1.5, 0]}
        position={[1, 1.6, -2.5]}
        categoryIndex={2}
        categories={bloodCategories}
      />
      <Annotation
        rotation={[0, 1.5, 0]}
        position={[10, 1, -2.5]}
        categoryIndex={3}
        categories={bloodCategories}
      />
    </>
  );
}

useGLTF.preload("/models/steam.glb");
