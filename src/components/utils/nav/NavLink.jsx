import { motion } from "framer-motion";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children, className }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li data-hover>
      <Link
        href={href}
        className={twMerge(
          "relative  cursor-pointer ",
          isActive && "text-text",
          className
        )}
      >
        {children}
        <span className="underline-effect"></span>
      </Link>
      <style jsx>{`
        .underline-effect {
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          background-color: #01062e; /* teal-300 equivalent */
          width: 0;
          transition: width 0.3s ease-in-out;
        }

        li:hover .underline-effect {
          width: 100%;
          transition: width 0.3s ease-in-out;
        }
      `}</style>
    </li>
  );
}
