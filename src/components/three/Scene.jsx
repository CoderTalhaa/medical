"use client";
import {
  Environment,
  Grid,
  KeyboardControls,
  Loader,
  PointerLockControls,
  Stars,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect, useMemo } from "react";
import Exp from "./experience/Exp";
import { Physics } from "@react-three/rapier";
import { Ground } from "./experience/Ground";
import { Player } from "./experience/Player";

export const Controls = {
  forward: "forward",
  backward: "backward",
  left: "left",
  right: "right",
};
export default function Scene() {
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
          <color attach="background" args={["#000"]} />
          {/* <fog attach="fog" args={["#202030", 10, 45]} /> */}
          <hemisphereLight intensity={0.2} color="#eaeaea" groundColor="blue" />
          <Suspense fallback={null}>
            <Physics>
              <Exp />
              <Ground />
              <Player />
            </Physics>
          </Suspense>

          {/* <Grid infiniteGrid={true} /> */}
          <ambientLight intensity={0.5} />
          <Environment preset="city" />
          <PointerLockControls />
        </Canvas>
      </KeyboardControls>
    </>
  );
}
