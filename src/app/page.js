"use client";
import Scene from "@/components/three/Scene";
import Ovarlay from "@/components/ui/Ovarlay";
import LoadingScreen from "@/components/utils/loadingScreen/LoadingScreen";
import useModelStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import Lenis from "lenis";
import React, { useEffect } from "react";
import useAudio from "@/hooks/useAudio";

export default function Home() {
  const { isLoading, setIsLoading } = useModelStore();
  // const { toggleMute, isMuted } = useAudio();

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
      <div className="dot" />
      <Scene />
      {/* <button className="absolute bottom-52 right-5 z-10" onClick={toggleMute}>
        {isMuted ? "Unmute" : "Mute"}
      </button> */}

      <Ovarlay />
    </>
  );
}
