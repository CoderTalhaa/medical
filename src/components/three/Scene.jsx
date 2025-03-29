"use client";
import { Environment, Loader, PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import Exp from "./experience/Exp";
import CameraRig from "./experience/CameraRig";

export default function Scene() {
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      setEventSource(document.body);
    }
  }, []);

  return (
    <>
      <Loader />
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: false }}
        camera={{ position: [3, 1.5, 4], fov: 60 }}
        eventSource={eventSource}
        className="canvas"
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
