import { CameraControls } from "@react-three/drei";
import { Brain } from "./model/Brain";
import { useEffect, useRef } from "react";
import useModelStore from "@/store/useStore";

export default function Exp() {
  const cameraRef = useRef();

  const { cameraPosition } = useModelStore();

  useEffect(() => {
    if (cameraPosition && cameraRef.current) {
      const { position, target } = cameraPosition;
      cameraRef.current.setLookAt(
        ...position, // Camera position
        ...target, // Look-at target
        true // Enable smooth transition
      );
    }
  }, [cameraPosition]);

  return (
    <>
      <CameraControls
        ref={cameraRef}
        verticalDragToForward={true}
        // dollyToCursor={true}
      />

      <Brain position={[0, -0.9, 0]} />
    </>
  );
}
