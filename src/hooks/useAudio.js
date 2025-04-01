// src/hooks/useAudio.js
import { useState, useEffect } from "react";
import { Howl } from "howler";

export default function useAudio(modelPositions) {
  const [sounds, setSounds] = useState({});

  // Initialize sounds
  useEffect(() => {
    const backgroundSound = new Howl({
      src: ["/audio/background.mp3"],
      loop: true,
      volume: 0.8, // Default volume, controlled externally
    });

    const modelSounds = {
      brain: new Howl({
        src: ["/audio/brain.mp3"],
        volume: 0,
      }),
      lung: new Howl({
        src: ["/audio/lung.mp3"],
        volume: 0,
      }),
      heart: new Howl({
        src: ["/audio/heart.mp3"],
        volume: 0,
      }),
      blood: new Howl({
        src: ["/audio/blood.mp3"],
        volume: 0,
      }),
      female: new Howl({
        src: ["/audio/female.mp3"],
        volume: 0,
      }),
    };

    // Start background sound
    backgroundSound.play();

    setSounds({ background: backgroundSound, ...modelSounds });

    // Cleanup
    return () => {
      backgroundSound.stop();
      Object.values(modelSounds).forEach((sound) => sound.stop());
    };
  }, []); // No dependencies, runs once on mount

  // Function to update sound based on camera position and mute state
  const updateSound = (camera, isMuted) => {
    if (!sounds.background || !camera) return;

    const cameraPos = camera.position;
    let isNearModel = false;

    Object.keys(modelPositions).forEach((model) => {
      const modelPos = modelPositions[model];
      const distance = cameraPos.distanceTo({
        x: modelPos[0],
        y: modelPos[1],
        z: modelPos[2],
      });

      const proximityThreshold = 5;
      const sound = sounds[model];

      if (distance < proximityThreshold) {
        isNearModel = true;
        if (!sound.playing() && !isMuted) sound.play();
        sound.volume(
          isMuted ? 0 : Math.max(0, 1 - distance / proximityThreshold)
        );
        sounds.background.volume(isMuted ? 0 : 0.2);
      } else {
        sound.volume(0);
        if (sound.playing()) sound.stop();
      }
    });

    if (!isNearModel) {
      sounds.background.volume(isMuted ? 0 : 0.5);
    }
  };

  return { sounds, updateSound };
}
