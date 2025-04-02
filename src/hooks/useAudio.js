// src/hooks/useAudio.js
import { useState, useEffect } from "react";
import { Howl } from "howler";

export default function useAudio(modelPositions) {
  const [sounds, setSounds] = useState({});
  const [isMuted, setIsMuted] = useState(false);

  // Initialize sounds
  useEffect(() => {
    const backgroundSound = new Howl({
      src: ["/audio/background2.mp3"],
      loop: true,
      volume: 0.5,
    });

    const modelSounds = {
      brain: new Howl({ src: ["/audio/brain.mp3"], volume: 0 }),
      heart: new Howl({ src: ["/audio/heart.mp3"], volume: 0 }),
      lung: new Howl({ src: ["/audio/lung.mp3"], volume: 0 }),
      blood: new Howl({ src: ["/audio/blood.mp3"], volume: 0 }),
    };

    backgroundSound.play();
    setSounds({ background: backgroundSound, ...modelSounds });

    // Handle tab visibility
    const handleVisibilityChange = () => {
      if (document.hidden) {
        backgroundSound.pause();
        Object.values(modelSounds).forEach((sound) => sound.pause());
      } else if (!isMuted) {
        backgroundSound.play();
        // Model sounds will resume via updateSound if near a model
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Cleanup
    return () => {
      backgroundSound.stop();
      Object.values(modelSounds).forEach((sound) => sound.stop());
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Removed isMuted dependency

  // Update sound based on camera position
  const updateSound = (camera) => {
    if (!camera || !sounds.background) return;

    const cameraPos = camera.position;
    let isNearModel = false;

    Object.keys(modelPositions).forEach((model) => {
      const modelPos = modelPositions[model];
      const distance = cameraPos.distanceTo({
        x: modelPos[0],
        y: modelPos[1],
        z: modelPos[2],
      });

      const threshold = 5;
      const sound = sounds[model];

      if (distance < threshold) {
        isNearModel = true;
        if (sound) {
          // Skip if no sound (e.g., female)
          if (!sound.playing() && !isMuted) sound.play();
          // Adjusted volume: scales from 0.3 to 1 based on distance
          sound.volume(
            isMuted ? 0 : Math.min(1, 0.3 + 0.7 * (1 - distance / threshold))
          );
        }
        sounds.background.volume(isMuted ? 0 : 0.05);
      } else if (sound) {
        sound.volume(0);
        if (sound.playing()) sound.stop();
      }
    });

    if (!isNearModel) {
      sounds.background.volume(isMuted ? 0 : 0.5);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      if (newMuted) {
        Object.values(sounds).forEach((sound) => sound.pause());
      } else if (!document.hidden) {
        sounds.background.play();
        // Model sounds will resume via updateSound if near a model
      }
      return newMuted;
    });
  };

  return { updateSound, toggleMute, isMuted };
}
