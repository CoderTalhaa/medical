import React, { useMemo, useRef, useState } from "react";
import { Outlines, useGLTF } from "@react-three/drei";
import { brainData } from "@/data/brainData";
import useModelStore from "@/store/useStore";
import { useSpring, a } from "@react-spring/three";
import * as THREE from "three";

export function Brain({ ...props }) {
  const { nodes, materials } = useGLTF("/models/brain2.glb");
  const { setContent, spread, setCameraPosition } = useModelStore();

  const MeshWithHover = ({ geometry, position: initialPosition, name }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = useState(false);

    const brainMaterial = useMemo(() => {
      const mat = materials.brain.clone();
      mat.transparent = true;
      return mat;
    }, [materials.brain]);

    const originalPosition = useMemo(() => [...initialPosition], []);

    const { offset } = useSpring({
      offset: spread,
      config: { mass: 1, tension: 200, friction: 20 },
    });

    const handleClick = () => {
      setContent(brainData[name]);

      const box = new THREE.Box3().setFromObject(meshRef.current);
      const center = new THREE.Vector3();
      box.getCenter(center);

      const position = [center.x + 0.5, center.y + 1, center.z + 0.5];
      const target = [center.x, center.y, center.z];
      setCameraPosition(position, target);
    };

    return (
      <a.mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={geometry}
        material={brainMaterial}
        position={offset.to((s) => [
          originalPosition[0] + originalPosition[0] * s * 2,
          originalPosition[1] + originalPosition[1] * s,
          originalPosition[2] + originalPosition[2] * s * 2,
        ])}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={handleClick}
        // material-color={hovered ? "#865E38" : "white"}
      >
        {hovered && <Outlines thickness={2} color="#865E38" />}
      </a.mesh>
    );
  };

  return (
    <group {...props} dispose={null}>
      {Object.keys(nodes).map((key, index) => {
        if (!key.startsWith("Object_")) return null;
        return (
          <MeshWithHover
            key={index}
            name={key}
            geometry={nodes[key].geometry}
            position={[
              nodes[key].position.x,
              nodes[key].position.y,
              nodes[key].position.z,
            ]}
          />
        );
      })}
    </group>
  );
}

useGLTF.preload("/models/brain2.glb");
