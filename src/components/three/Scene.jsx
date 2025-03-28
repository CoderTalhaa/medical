"use client";
import { Environment, Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import Exp from "./experience/Exp";
import CameraRig from "./experience/CameraRig";

export default function Scene() {
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    setEventSource(window);
  }, []);

  return (
    <>
      <Loader />
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [3, 1.5, 4], fov: 60 }}
        className="canvas"
        // eventSource={eventSource}
      >
        <Suspense fallback={null}>
          <Exp />
          {/* <CameraRig>
        </CameraRig> */}
        </Suspense>

        {/* <axesHelper scale={10} /> */}

        <ambientLight intensity={0.5} />
        <Environment preset="warehouse" />
      </Canvas>
    </>
  );
}
