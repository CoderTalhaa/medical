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
  const { isLoading, setIsLoading, currentModel } = useModelStore();
  const { toggleMute, isMuted } = useAudio();

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

  const containerVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Control stagger timing here
        delayChildren: 0.2, // Optional: delay before starting animations
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1, // Animate in reverse order when exiting
        when: "afterChildren", // Wait for children to finish before parent exits
      },
    },
  };

  const letterVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 0.1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -50,
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  useEffect(() => {
    if (typeof window !== "undefined" && currentModel?.bg) {
      gsap.to(document.body, {
        backgroundColor: currentModel.bg,
        duration: 1,
        ease: "power2.out",
      });
    }
  }, [currentModel]);

  return (
    <>
      {isLoading && <LoadingScreen setIsLoading={setIsLoading} />}
      <Scene />
      <button className="absolute bottom-52 right-5 z-10" onClick={toggleMute}>
        {isMuted ? "Unmute" : "Mute"}
      </button>

      <div className="noise w-full h-full absolute inset-0 -z-[2]"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentModel.name}
          className="text-[25rem] absolute -z-[1] inset-0 h-full w-full flex items-center justify-center font-headings font-bold uppercase"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ color: currentModel.color }}
        >
          {currentModel.name.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.div>
      </AnimatePresence>

      <Ovarlay />
    </>
  );
}
