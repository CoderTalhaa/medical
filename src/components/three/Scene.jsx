"use client";
import {
  Environment,
  KeyboardControls,
  Loader,
  PointerLockControls,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import Exp from "./experience/Exp";
import { Physics } from "@react-three/rapier";
import { Ground } from "./experience/Ground";
import { Player } from "./experience/Player";
import useModelStore from "@/store/useStore";
import SkyBillboard from "./experience/SkyBillboard";
import Background from "./experience/Background";

export const Controls = {
  forward: "forward",
  backward: "backward",
  left: "left",
  right: "right",
};

export default function Scene({ showWelcome }) {
  const { content } = useModelStore();
  const pointerLockControlsRef = useRef();

  const map = useMemo(
    () => [
      { name: Controls.forward, keys: ["ArrowUp", "KeyW"] },
      { name: Controls.backward, keys: ["ArrowDown", "KeyS"] },
      { name: Controls.left, keys: ["ArrowLeft", "KeyA"] },
      { name: Controls.right, keys: ["ArrowRight", "KeyD"] },
    ],
    []
  );

  return (
    <>
      <Loader />
      <KeyboardControls map={map}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          gl={{ antialias: false }}
          camera={{ position: [0, 2, 0], fov: 60 }}
          className="canvas"
        >
          <color attach="background" args={["#15151a"]} />
          <Background />
          <SkyBillboard />

          <Suspense fallback={null}>
            <Physics>
              <Exp />
              <Player />
              <Ground />
            </Physics>
          </Suspense>

          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          {!showWelcome && !content && (
            <PointerLockControls ref={pointerLockControlsRef} />
          )}
        </Canvas>
      </KeyboardControls>
    </>
  );
}
