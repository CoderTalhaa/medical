import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function LoadingScreen({ setIsLoading }) {
  const numberColumn1Ref = useRef(null);
  const numberColumn2Ref = useRef(null);
  const containerRef = useRef(null);

  const tl = gsap.timeline();

  useGSAP(
    () => {
      tl.to(numberColumn1Ref.current, {
        y: "-40%",
        duration: 5,
        ease: "power2.inOut",
      });
      tl.to(
        numberColumn2Ref.current,
        {
          y: "-40%",
          duration: 5,
          ease: "power2.inOut",
        },
        "-=4.7"
      );
      tl.fromTo(
        ".loading",
        {
          width: "0%",
          duration: 5,
          ease: "power4.inOut",
        },
        {
          width: "100%",
          duration: 5,
          ease: "power4.inOut",
        },
        "<"
      );
      tl.to(".loading", {
        height: "100%",
        duration: 1,
        ease: "power4.inOut",
      });
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: "power4.inOut",
        onComplete: () => {
          setIsLoading(false);
        },
      });
    },
    { dependencies: [] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 h-screen w-screen bg-[#0D0F0E] overflow-hidden pointer-events-none z-[200] flex items-center justify-center"
    >
      <div className="relative flex items-start text-white text-2xl md:text-9xl font-bold  overflow-clip">
        <div className="bg-[#0D0F0E] absolute  top-0   w-full h-[50%] z-50"></div>
        <div className="bg-[#0D0F0E] absolute bottom-0  w-full h-[40%] z-50"></div>
        {/* First number column */}
        <div ref={numberColumn1Ref} className="relative translate-y-[50%]">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={`col1-${num}`}
              className=" flex items-center justify-center will-change-transform"
            >
              {num}
            </div>
          ))}
        </div>

        {/* Second number column */}
        <div ref={numberColumn2Ref} className="relative translate-y-[50%]">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div
              key={`col2-${num}`}
              className=" flex items-center will-change-transform justify-center"
            >
              {num}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-tech-gradient loading will-change-transform absolute bottom-0 left-0 h-[5%] z-50"></div>
    </div>
  );
}
