"use client";
import {
  Environment,
  Grid,
  KeyboardControls,
  Loader,
  OrbitControls,
  PointerLockControls,
  Stars,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useRef } from "react";
import Exp from "./experience/Exp";
import { Physics } from "@react-three/rapier";
import { Ground } from "./experience/Ground";
import { Player } from "./experience/Player";
import useModelStore from "@/store/useStore";

export const Controls = {
  forward: "forward",
  backward: "backward",
  left: "left",
  right: "right",
};
export default function Scene({ showWelcome, isMuted }) {
  const { content } = useModelStore();
  const pointerLockControlsRef = useRef();

  useEffect(() => {
    if (!pointerLockControlsRef.current) return;

    if (content) {
      console.log("Unlocking pointer...");
      pointerLockControlsRef.current.unlock();
    } else {
      pointerLockControlsRef.current.lock();
    }
  }, [content]);

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
          camera={{ position: [0, 2, 0], fov: 75 }}
          className="canvas"
        >
          <Stars
            radius={100}
            depth={50}
            count={1000}
            factor={4}
            saturation={0}
            fade
            speed={1}
          />
          <color attach="background" args={["#15151a"]} />
          {/* <fog attach="fog" args={["#202030", 10, 45]} /> */}

          <Suspense fallback={null}>
            <Physics>
              <Exp isMuted={isMuted} />
              <Ground />
              <Player />
            </Physics>
          </Suspense>

          {/* <Grid infiniteGrid={true} /> */}
          <ambientLight intensity={0.5} />
          <Environment preset="warehouse" />
          {!showWelcome && !content && (
            <PointerLockControls ref={pointerLockControlsRef} />
          )}
        </Canvas>
      </KeyboardControls>
    </>
  );
}
