import useModelStore from "@/store/useStore";
import { Html } from "@react-three/drei";
import { Star, Users, Pyramid, Puzzle } from "lucide-react";

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

  const icons = [
    <Star size={12} color="white" key={categoryIndex[0]} />,
    <Pyramid size={12} color="white" key={categoryIndex[1]} />,
    <Users size={12} color="white" key={categoryIndex[2]} />,
    <Puzzle size={12} color="white" key={categoryIndex[3]} />,
  ];

  return (
    <>
      <Html
        position={position}
        rotation={rotation}
        occlude="blending"
        transform
        geometry={<circleGeometry args={[0.2, 32]} />}
        onClick={handleClick}
      >
        <div>
          <div>{icons[categoryIndex]}</div>
        </div>
      </Html>
    </>
  );
}
