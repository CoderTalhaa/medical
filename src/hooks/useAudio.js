import { useState, useEffect, useCallback } from "react";
import { Howl } from "howler";

const DEFAULT_MODEL_POSITIONS = {
  brain: [20, 1.4, -3],
  heart: [1, 0, 20],
  lung: [-20, 0.5, 10],
  blood: [-10, 0.3, -20],
};

export default function useAudio(modelPositions = DEFAULT_MODEL_POSITIONS) {
  const [sounds, setSounds] = useState({});
  const [isMuted, setIsMuted] = useState(false);

  // Initialize sounds with custom base volumes (adjust these as needed)
  useEffect(() => {
    const backgroundSound = new Howl({
      src: ["/audio/background2.mp3"],
      loop: true,
      volume: 0.01, // Very quiet background
    });

    // Adjust these base volumes per sound (0-1)
    const modelSounds = {
      brain: new Howl({ src: ["/audio/brain.mp3"], volume: 0.01 }),
      heart: new Howl({ src: ["/audio/heart.mp3"], volume: 1 }),
      lung: new Howl({ src: ["/audio/lung.mp3"], volume: 1 }),
      blood: new Howl({ src: ["/audio/blood.mp3"], volume: 1 }),
    };

    backgroundSound.play();
    setSounds({ background: backgroundSound, ...modelSounds });

    const handleVisibilityChange = () => {
      if (document.hidden) {
        Howler.mute(true); // Mute all sounds when tab is inactive
      } else {
        Howler.mute(isMuted); // Restore mute state when tab is active
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      Howler.mute(false); // Unmute before cleanup
      backgroundSound.stop();
      Object.values(modelSounds).forEach((sound) => sound.stop());
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Update sound based on camera position
  const updateSound = useCallback(
    (camera) => {
      if (!camera || !sounds.background) return;

      const cameraPos = camera.position;
      let isNearModel = false;

      Object.entries(modelPositions).forEach(([model, pos]) => {
        const sound = sounds[model];
        if (!sound) return;

        const dx = cameraPos.x - pos[0];
        const dy = cameraPos.y - pos[1];
        const dz = cameraPos.z - pos[2];
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        const threshold = 15;
        if (distance < threshold) {
          isNearModel = true;
          if (!sound.playing() && !isMuted) sound.play();

          // Scale volume dynamically (0.1 to 1)
          const volume = Math.min(1, 0.1 + 0.9 * (1 - distance / threshold));
          sound.volume(isMuted ? 0 : volume);

          // Lower background when near a model
          sounds.background.volume(isMuted ? 0 : 0.001);
        } else {
          sound.volume(0);
          if (sound.playing()) sound.stop();
        }
      });

      if (!isNearModel) {
        sounds.background.volume(isMuted ? 0 : 0.01); // Restore background volume
      }
    },
    [sounds, isMuted, modelPositions]
  );

  // Toggle mute/unmute (now uses Howler.mute for complete silence)
  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const newMuted = !prev;
      Howler.mute(newMuted); // This mutes ALL sounds globally
      return newMuted;
    });
  }, []);

  return { updateSound, toggleMute, isMuted };
}
