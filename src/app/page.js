"use client";
import Scene from "@/components/three/Scene";
import Ovarlay from "@/components/ui/Ovarlay";
import LoadingScreen from "@/components/utils/loadingScreen/LoadingScreen";
import useModelStore from "@/store/useStore";
import Lenis from "lenis";
import React, { useEffect, useState } from "react";

export default function Home() {
  const { isLoading, setIsLoading } = useModelStore();
  const [isMuted, setIsMuted] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
      touchMultiplier: 1.0,
    });

    lenis.stop();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    const handleLoadingCompletion = () => {
      setIsLoading(false);
      lenis.scrollTo(0, { immediate: true });
      lenis.start();
    };

    if (!isLoading) handleLoadingCompletion();

    return () => {
      lenis.stop();
      lenis.destroy();
    };
  }, [isLoading]);

  return (
    <>
      {isLoading && <LoadingScreen setIsLoading={setIsLoading} />}

      {showWelcome && (
        <div className="fixed inset-0 h-full w-full bg-[#0000008a] backdrop-blur-lg z-[999] flex justify-center items-center ">
          <div className="border h-[50%] border-gray-400 rounded-xl p-8 shadow-2xl backdrop-blur-sm flex flex-col items-center justify-center text-center ">
            <h1 className="~text-2xl/5xl font-manrope font-bold text-white mb-4">
              Welcome to the VR Experience
            </h1>
            <p className="text-white font-text max-w-xl pb-10">
              Journey inside the human body and explore different organs like
              never before. Immerse yourself in an interactive and educational
              adventure.
            </p>
            <button
              onClick={() => setShowWelcome(false)}
              className="border border-text rounded-full text-xl px-4 py-2  hover:bg-black/90 transition-all duration-300 ease-in-out"
            >
              Get Started
            </button>
          </div>
        </div>
      )}

      <div className="dot" />
      <Scene showWelcome={showWelcome} isMuted={isMuted} />

      <button
        onClick={() => setIsMuted((prev) => !prev)}
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          padding: "10px 20px",
          backgroundColor: isMuted ? "#ff4444" : "#44ff44",
          color: "black",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          zIndex: 100,
        }}
      >
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <Ovarlay />
    </>
  );
}
