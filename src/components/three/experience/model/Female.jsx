import { useGLTF } from "@react-three/drei";
import Annotation from "../Annotation";
import { femaleCategories } from "@/data/femaleData";

export function Female(props) {
  const { nodes, materials } = useGLTF("/models/female.glb");

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

      <Annotation
        position={[0, 3, 0]}
        categoryIndex={0}
        categories={femaleCategories}
      />
      <Annotation
        position={[2, 2, 0.5]}
        categoryIndex={1}
        categories={femaleCategories}
      />
      <Annotation
        position={[-2, 2, 0.5]}
        categoryIndex={2}
        categories={femaleCategories}
      />
      <Annotation
        position={[0, -0.5, 0.6]}
        categoryIndex={3}
        categories={femaleCategories}
      />
    </>
  );
}

useGLTF.preload("/models/female.glb");
