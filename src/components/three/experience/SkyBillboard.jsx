import { useTexture } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function SkyBillboard() {
  const texture = useTexture("/img/images-removebg-preview.png");
  const billboardRef = useRef();

  useEffect(() => {
    if (billboardRef.current) {
      billboardRef.current.lookAt(0, 0, 0);
    }
  }, []);

  return (
    <mesh ref={billboardRef} position={[0, 50, -70]} scale={[10, 5, 1]}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <meshStandardMaterial fog={false} map={texture} transparent />
    </mesh>
  );
}
