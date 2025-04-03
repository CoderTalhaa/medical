import useModelStore from "@/store/useStore";
import { Html } from "@react-three/drei";
import { Info } from "lucide-react";

export default function Annotation({
  position,
  rotation = [0, 0, 0],
  categoryIndex,
  categories,
}) {
  const { setContent } = useModelStore();

  const handleClick = () => {
    const categoryKey = Object.keys(categories)[categoryIndex];
    const categoryContent = categories[categoryKey];
    setContent(categoryContent);
  };

  return (
    <>
      <Html
        position={position}
        rotation={rotation}
        occlude="blending"
        transform
        geometry={<circleGeometry args={[0.15, 32]} />}
        onClick={handleClick}
      >
        <div>
          <Info size={15} />
        </div>
      </Html>
    </>
  );
}
