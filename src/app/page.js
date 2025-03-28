"use client";
import Scene from "@/components/three/Scene";
import LoadingScreen from "@/components/utils/loadingScreen/LoadingScreen";
import useModelStore from "@/store/useStore";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from "lenis";
import React, { useEffect, useRef } from "react";

export default function Home() {
  const {
    isLoading,
    setIsLoading,
    content,
    spread,
    setSpread,
    setCameraPosition,
  } = useModelStore();

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

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  const resetCamera = () => {
    setCameraPosition([3, 1.5, 4], [0, 0.5, 0]);
  };

  return (
    <>
      {isLoading && <LoadingScreen setIsLoading={setIsLoading} />}
      <Scene />

      <h1 className="~text-4xl/7xl absolute top-32 left-10 font-headings">
        Brain
      </h1>

      <AnimatePresence mode="wait">
        {content && (
          <motion.div
            key={content.heading}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-[40%] left-5 bg-slate-100 text-text2 p-6 rounded-lg flex flex-col z-50 gap-2"
          >
            <h2 className="~text-2xl/5xl font-headings">{content.heading}</h2>
            <p className="~text-base/2xl font-text pl-1 max-w-[400px]">
              {content.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls on Right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: "absolute",
          top: "50%",
          right: 20,
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          zIndex: 1000,
        }}
      >
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={spread}
          onChange={(e) => setSpread(parseFloat(e.target.value))}
          style={{
            writingMode: "vertical-rl", // Vertical slider
            height: "150px",
            cursor: "pointer",
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetCamera}
          style={{
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.1)",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset Camera
        </motion.button>
      </motion.div>
    </>
  );
}
