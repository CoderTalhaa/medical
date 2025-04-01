import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations, Html } from "@react-three/drei";
import { lungData } from "@/data/lungData.js";
import useModelStore from "@/store/useStore";
import { Info } from "lucide-react";
import { extend } from "@react-three/fiber";
import { geometry } from "maath";

extend(geometry);

export function Lung(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/AnimLung_optimized.glb"
  );
  const { actions } = useAnimations(animations, group);

  const { setContent } = useModelStore();

  const handleClick = () => {
    setContent(lungData);
  };

  useEffect(() => {
    if (actions) {
      const action = Object.values(actions)[0];
      if (action) {
        action.play();
        action.timeScale = 3; // Increase speed (e.g., 2x faster)
      }
    }
  }, [actions]);
  return (
    <>
      <group ref={group} {...props} dispose={null}>
        <group name="Scene">
          <mesh
            name="0"
            castShadow
            receiveShadow
            geometry={nodes["0"].geometry}
            material={materials.Right_lung_mat}
            morphTargetDictionary={nodes["0"].morphTargetDictionary}
            morphTargetInfluences={nodes["0"].morphTargetInfluences}
            position={[-1.245, 0.989, -0.129]}
          />
          <mesh
            name="Trachea_Trachea_mat_0"
            castShadow
            receiveShadow
            geometry={nodes.Trachea_Trachea_mat_0.geometry}
            material={materials.Trachea_mat}
            position={[-0.107, 2.136, -0.233]}
          />
          <mesh
            name="Pulmonary_veins_Pulmonary_veins_mat_0"
            castShadow
            receiveShadow
            geometry={nodes.Pulmonary_veins_Pulmonary_veins_mat_0.geometry}
            material={materials.blue}
            position={[-0.064, 1.3, -0.32]}
          />
          <mesh
            name="Pulmonary_arteries_Pulmonary_arteries_mat_0"
            castShadow
            receiveShadow
            geometry={
              nodes.Pulmonary_arteries_Pulmonary_arteries_mat_0.geometry
            }
            material={materials.red}
            position={[-0.446, 1.625, -0.145]}
          />
          <mesh
            name="8"
            castShadow
            receiveShadow
            geometry={nodes["8"].geometry}
            material={materials.Left_lung2_mat}
            morphTargetDictionary={nodes["8"].morphTargetDictionary}
            morphTargetInfluences={nodes["8"].morphTargetInfluences}
            position={[1.283, 1.127, -0.111]}
          />
        </group>
      </group>
      <Html
        position={[1, 1, 0]}
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

useGLTF.preload("/models/AnimLung_optimized.glb");
