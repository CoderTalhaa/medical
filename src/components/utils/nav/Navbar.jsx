"use client";
import React, { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 p-4  w-full z-50">
      <nav className="hidden md:flex items-center justify-between p-4 ">
        <div className="w-22 h-22 object-cover flex flex-col ">
          <Image
            src="/img/technical.png"
            width={100}
            height={100}
            alt="logo"
            className="scale-110"
          />
          <Image src="/img/healthhub.png" width={100} height={100} alt="logo" />
        </div>
        <div className="flex items-center gap-8  mr-10">
          <ul className="flex gap-8 font-manrope font-semibold tracking-wide ">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about">About</NavLink>
          </ul>
        </div>
      </nav>
    </header>
  );
}
