import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Heart(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/AnimHeart_optimized.glb"
  );
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => action.play()); // Play all animations
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <mesh
          name="1"
          castShadow
          receiveShadow
          geometry={nodes["1"].geometry}
          material={materials["Ventricle.001"]}
          morphTargetDictionary={nodes["1"].morphTargetDictionary}
          morphTargetInfluences={nodes["1"].morphTargetInfluences}
          position={[-0.021, 1.205, 0.115]}
        />
        <mesh
          name="2"
          castShadow
          receiveShadow
          geometry={nodes["2"].geometry}
          material={materials["left_atrium.001"]}
          morphTargetDictionary={nodes["2"].morphTargetDictionary}
          morphTargetInfluences={nodes["2"].morphTargetInfluences}
          position={[-0.072, 1.611, -0.36]}
        />
        <mesh
          name="3"
          castShadow
          receiveShadow
          geometry={nodes["3"].geometry}
          material={materials["right_atrium.001"]}
          morphTargetDictionary={nodes["3"].morphTargetDictionary}
          morphTargetInfluences={nodes["3"].morphTargetInfluences}
          position={[-0.832, 1.363, 0.023]}
        />
        <mesh
          name="4"
          castShadow
          receiveShadow
          geometry={nodes["4"].geometry}
          material={materials["aorta.001"]}
          morphTargetDictionary={nodes["4"].morphTargetDictionary}
          morphTargetInfluences={nodes["4"].morphTargetInfluences}
          position={[-0.336, 2.081, -0.522]}
        />
        <mesh
          name="5"
          castShadow
          receiveShadow
          geometry={nodes["5"].geometry}
          material={materials["coronary_artery.001"]}
          morphTargetDictionary={nodes["5"].morphTargetDictionary}
          morphTargetInfluences={nodes["5"].morphTargetInfluences}
          position={[-0.066, 1.176, 0.261]}
        />
        <mesh
          name="6"
          castShadow
          receiveShadow
          geometry={nodes["6"].geometry}
          material={materials["coronary_veins.001"]}
          morphTargetDictionary={nodes["6"].morphTargetDictionary}
          morphTargetInfluences={nodes["6"].morphTargetInfluences}
          position={[-0.165, 0.95, 0.08]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models/AnimHeart_optimized.glb");
