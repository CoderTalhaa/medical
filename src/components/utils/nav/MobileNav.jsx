import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function MobileNav() {
  return (
    <nav className="flex items-center justify-between md:hidden px-2 relative">
      <div className="relative w-[100px]">
        <Image alt="logo" src={"/img/logo.png"} width={100} height={100} />
      </div>
      <MobileMenu />
    </nav>
  );
}

function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Menu onClick={() => setOpen((prev) => !prev)} />
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 w-full h-full bg-[#141414] flex flex-col items-center justify-center text-white z-50"
          >
            <div className="absolute top-5 left-5 w-[100px]">
              <Image
                alt="logo"
                src={"/img/logo.png"}
                width={100}
                height={100}
              />
            </div>
            <div className="absolute top-5 right-5">
              <X
                onClick={() => setOpen(false)}
                className="text-white cursor-pointer"
                size={32}
              />
            </div>

            <ul className="text-lg font-medium space-y-6 text-center">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className={`block px-4 py-2 transition-colors duration-300 ${
                      pathname === item.path
                        ? "text-teal-300"
                        : "text-white hover:text-gray-300"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
