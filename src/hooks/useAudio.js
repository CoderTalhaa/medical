// src/hooks/useAudio.js
import { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import useModelStore from "@/store/useStore";

const useAudio = () => {
  const { currentModel } = useModelStore();
  const [isMuted, setIsMuted] = useState(false);
  const audioRefs = useRef({
    background: null,
    model: null,
  });

  // Audio configuration
  const audioMap = {
    // brain: { src: "/audio/ambient_brain.mp3", volume: 0.5 },
    heart: { src: "/audio/heartbeat.mp3", volume: 0.8 },
    // lungs: { src: "/audio/breathing.mp3", volume: 0.7 },
    // liver: { src: "/audio/ambient_liver.mp3", volume: 0.5 },
    // kidney: { src: "/audio/ambient_kidney.mp3", volume: 0.5 },
  };

  // Initialize audio
  useEffect(() => {
    audioRefs.current.background = new Howl({
      src: ["/audio/background.mp3"],
      loop: true,
      volume: 0.3,
      autoplay: true,
    });

    audioRefs.current.model = new Howl({
      src: ["/audio/placeholder.mp3"],
      loop: true,
      volume: 0,
    });

    return () => {
      audioRefs.current.background.unload();
      audioRefs.current.model.unload();
    };
  }, []);

  // Update model-specific audio
  useEffect(() => {
    const background = audioRefs.current.background;
    const model = audioRefs.current.model;
    const currentAudio = audioMap[currentModel.name] || {
      src: null,
      volume: 0,
    };

    model.stop();

    if (currentAudio.src) {
      model._src = currentAudio.src;
      model.load();
      model.volume(isMuted ? 0 : currentAudio.volume);
      model.play();
      background.volume(isMuted ? 0 : 0.2); // Adjust background based on mute
    } else {
      model.volume(0);
      background.volume(isMuted ? 0 : 0.3);
    }
  }, [currentModel.name, isMuted]);

  // Toggle mute
  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      const background = audioRefs.current.background;
      const model = audioRefs.current.model;

      if (newMuted) {
        // Mute: Set both volumes to 0
        background.volume(0);
        model.volume(0);
      } else {
        // Unmute: Restore volumes based on current model
        background.volume(audioMap[currentModel.name]?.src ? 0.2 : 0.3);
        model.volume(audioMap[currentModel.name]?.volume || 0);
        if (!model.playing()) model.play(); // Ensure model audio restarts if stopped
      }

      return newMuted;
    });
  };

  return { toggleMute, isMuted };
};

export default useAudio;
