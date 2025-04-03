"use client";
import Scene from "@/components/three/Scene";
import Ovarlay from "@/components/ui/Ovarlay";
import useAudio from "@/hooks/useAudio";
import React, { useState } from "react";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);
  const { toggleMute, isMuted } = useAudio();

  return (
    <>
      {showWelcome && (
        <div className="fixed inset-0 h-full w-full bg-[#0000008a] backdrop-blur-lg z-[999] flex justify-center items-center ">
          <div className="border h-[50%] border-gray-400 rounded-xl p-8 shadow-2xl backdrop-blur-sm flex flex-col items-center justify-center text-center ">
            <h1 className="~text-2xl/3xl font-manrope font-bold text-white mb-4">
              Welcome to the Health Revolution Congress (The VR experience)!
            </h1>
            <p className="text-white font-text max-w-xl pb-10">
              Step into a virtual journey through the Health Revolution Congress
              and immerse yourself in an interactive exploration of the human
              body. Navigate through the organs to the exciting sessions,
              insightful discussions, innovative challenges, as well as the
              leading innovators and stakeholders that will shape the day.
            </p>
            <p className="text-white font-text max-w-xl pb-10">
              <span className="font-bold">Your mission: </span>Explore,
              discover, and click on the icons to unlock exclusive insights
              about the event.
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
      <Scene showWelcome={showWelcome} />

      <button
        onClick={toggleMute}
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
