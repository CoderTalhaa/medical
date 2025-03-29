import { Box, CameraControls, Sphere, Torus } from "@react-three/drei";
import { Brain } from "./model/Brain";
import { useEffect, useRef } from "react";
import useModelStore from "@/store/useStore";
import { Heart } from "./model/Heart";
import { motion } from "framer-motion-3d";
import { AnimatePresence } from "framer-motion";

export default function Exp() {
  const cameraRef = useRef();

  const { cameraPosition, currentModel } = useModelStore();

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

  const modelVariants = {
    initial: { scale: 0, opacity: 0, rotateY: -Math.PI / 2 },
    animate: {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: { type: "spring", stiffness: 100, damping: 10 },
    },
    exit: {
      scale: 0,
      opacity: 0,
      rotateY: Math.PI / 2,
      transition: { duration: 0.4, ease: "easeIn" },
    },
  };

  return (
    <>
      <CameraControls
        ref={cameraRef}
        verticalDragToForward={true}
        // dollyToCursor={true}
      />

      <AnimatePresence mode="wait">
        <motion.group
          key={currentModel.name}
          variants={modelVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          {currentModel.name === "brain" && <Brain position={[0, -0.9, 0]} />}
          {currentModel.name === "heart" && <Heart position={[0, -0.9, 0]} />}
          {currentModel.name === "lungs" && (
            <Box args={[1, 1, 1]} position={[0, 0, 0]} />
          )}
          {currentModel.name === "liver" && (
            <Sphere args={[0.5, 32, 32]} position={[0, 0, 0]} />
          )}
          {currentModel.name === "kidney" && (
            <Torus args={[0.4, 0.15, 16, 100]} position={[0, 0, 0]} />
          )}
        </motion.group>
      </AnimatePresence>
    </>
  );
}
