import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations, Outlines } from "@react-three/drei";
import useModelStore from "@/store/useStore";
import * as THREE from "three";
import { heartData } from "@/data/heartData";

export function Heart(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/heart3.glb");
  const { actions, mixer } = useAnimations(animations || [], group);
  const { setContent, spread, setCameraPosition } = useModelStore();

  const heartRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Animation setup
  useEffect(() => {
    console.log("Animations:", animations);
    if (actions && animations?.length > 0) {
      const action = actions[animations[0].name];
      if (action) {
        action.reset().fadeIn(0.5).play();
        action.setLoop(THREE.LoopRepeat, Infinity);
        console.log("Playing animation:", animations[0].name);
      }
    } else {
      console.log("No animations found in heart3.glb");
    }

    // Cleanup
    return () => {
      if (actions && animations?.length > 0) {
        actions[animations[0].name]?.fadeOut(0.5);
      }
    };
  }, [actions, animations]);

  // Manual spread effect using mixer update
  // useEffect(() => {
  //   if (mixer) {
  //     const handleFrame = () => {
  //       mixer.update(0.016); // Update mixer at ~60fps
  //       if (heartRef.current) {
  //         const s = spread;
  //         heartRef.current.position.set(
  //           0.039 + 0.039 * s * 2, // x spread
  //           1.033 + 1.033 * s, // y spread
  //           -0.143 + -0.143 * s * 2 // z spread
  //         );
  //       }
  //     };
  //     const interval = setInterval(handleFrame, 16);
  //     return () => clearInterval(interval);
  //   }
  // }, [mixer, spread]);

  const handleClick = () => {
    setContent(heartData["heart"]);

    const box = new THREE.Box3().setFromObject(heartRef.current);
    const center = new THREE.Vector3();
    box.getCenter(center);

    const position = [center.x + 1, center.y + 1, center.z + 2];
    const target = [center.x, center.y, center.z];
    setCameraPosition(position, target);
  };

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          ref={heartRef}
          name="heart"
          castShadow
          receiveShadow
          geometry={nodes.heart.geometry}
          material={materials.heart}
          morphTargetDictionary={nodes.heart.morphTargetDictionary}
          morphTargetInfluences={nodes.heart.morphTargetInfluences}
          position={[0.039, 1.033, -0.143]}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
          onClick={handleClick}
          material-color={hovered ? "#D81B60" : "white"}
        ></mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/models/heart3.glb");
