"use client";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import AnimatedLink from "./AnimatedLink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

export default function Navbar() {
  const pathname = usePathname();
  const [openModal, setOpenModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ padding: "1rem" }}
      animate={{ padding: scrolled ? "0.5rem" : "1rem" }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed top-0 left-0  w-full z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-sm bg-transparent border-white/45 border-b-[1px]"
          : ""
      }`}
    >
      <nav className="hidden md:flex items-center justify-between p-4 ">
        <div className="w-22 h-22 object-cover flex flex-col ">
          <Image src="/img/technical.png" width={100} height={100} alt="logo" />
          <Image src="/img/healthhub.png" width={100} height={100} alt="logo" />
        </div>
        <div className="flex items-center gap-8  mr-10">
          <ul className="flex gap-8 font-manrope font-semibold tracking-wide ">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
          </ul>
        </div>
      </nav>
    </motion.header>
  );
}
