"use client";

import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import React, { useEffect, useState, useRef } from "react";

export default function EnhancedCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const cursorRef = useRef(null);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  // Smoother settings for outer ring
  const outerSmoothOptions = { damping: 25, stiffness: 175, mass: 0.6 };
  const outer = {
    x: useSpring(mouse.x, outerSmoothOptions),
    y: useSpring(mouse.y, outerSmoothOptions),
  };

  // Crisper settings for inner dot
  const innerSmoothOptions = { damping: 35, stiffness: 300, mass: 0.5 };
  const inner = {
    x: useSpring(mouse.x, innerSmoothOptions),
    y: useSpring(mouse.y, innerSmoothOptions),
  };

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX);
    mouse.y.set(clientY);

    // Check if cursor should be pointer style
    const element = document.elementFromPoint(clientX, clientY);
    if (element) {
      const computedStyle = window.getComputedStyle(element);
      setIsPointer(computedStyle.cursor === "pointer");
    }
  };

  const handleMouseDown = () => setIsClicking(true);
  const handleMouseUp = () => setIsClicking(false);

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  useEffect(() => {
    // Add listeners for elements with data-hover attribute
    const hoverableElements = document.querySelectorAll("[data-hover]");
    const clickableElements = document.querySelectorAll(
      "a, button,li, [role='button'], input[type='submit'], input[type='button']"
    );

    const addHoverListeners = (el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    };

    const removeHoverListeners = (el) => {
      el.removeEventListener("mouseenter", handleMouseEnter);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };

    hoverableElements.forEach(addHoverListeners);
    clickableElements.forEach(addHoverListeners);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      hoverableElements.forEach(removeHoverListeners);
      clickableElements.forEach(removeHoverListeners);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);

      // Restore default cursor
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        style={{
          left: outer.x,
          top: outer.y,
          x: "-50%",
          y: "-50%",
          backgroundColor: "transparent",
          border: `1px solid ${
            isClicking ? "rgba(0, 255, 255, 0.6)" : "rgba(0, 255, 255, 0.3)"
          }`,
        }}
        animate={{
          width: isHovering ? 64 : isPointer ? 40 : 36,
          height: isHovering ? 64 : isPointer ? 40 : 36,
          borderRadius: "50%",
          scale: isClicking ? 0.9 : 1,
        }}
        transition={{
          type: "spring",
          damping: 20,
          stiffness: 300,
        }}
        className="fixed pointer-events-none z-[201] hidden md:flex items-center justify-center"
      />

      {/* Inner dot */}
      <motion.div
        ref={cursorRef}
        style={{
          left: inner.x,
          top: inner.y,
          x: "-50%",
          y: "-50%",
          backgroundColor: isHovering
            ? "transparent"
            : "rgba(0, 255, 255, 0.6)",
        }}
        animate={{
          width: isHovering ? 12 : isPointer ? 10 : 16,
          height: isHovering ? 12 : isPointer ? 10 : 16,
          borderRadius: "50%",
          scale: isClicking ? 0.8 : 1,
        }}
        transition={{
          type: "spring",
          damping: 25,
          stiffness: 400,
        }}
        className="fixed pointer-events-none z-[201] hidden md:block"
      />

      {/* Additional effect for clicking animation */}
      {isClicking && (
        <motion.div
          style={{
            left: inner.x,
            top: inner.y,
            x: "-50%",
            y: "-50%",
            backgroundColor: "rgba(255, 0, 255, 0.3)",
            borderRadius: "50%",
          }}
          initial={{ width: 8, height: 8, opacity: 0.8 }}
          animate={{ width: 40, height: 40, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed pointer-events-none z-[201] hidden md:block"
        />
      )}
    </>
  );
}
