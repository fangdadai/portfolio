import React, { useEffect, useState } from "react";
import { navLinks } from "../Data";
import { HiMenuAlt3 } from "react-icons/hi";
import NavLinks from "./NavLinks";
const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [isTop, setIsTop] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsTop(window.scrollY > 20);
    });
  }, []);
  return (
    <div
      className={`${
        isTop ? "shadow-lg bg-ghostWhite" : ""
      } fixed w-full top-0 left-0 z-20`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-2">
        <div className="flex items-center gap-2">
          <div 
          className="rounded-full w-8 h-8 flex items-center justify-center text-white font-bold" 
          style={{backgroundColor: "#6495ED"}}>
            FD
          </div>
          <p className="text-xl">
            Portfolio
          </p>
        </div>
        <div className="md:flex hidden items-center gap-6">
          {navLinks.map((navLink) => {
            return (
              <div key={navLink.id}>
                <a href={`#${navLink.href}`} className="text-[0.95rem]">
                  {navLink.text}
                </a>
              </div>
            );
          })}
        </div>
        <HiMenuAlt3
          className="cursor-pointer text-3xl md:hidden"
          onClick={() => setToggle(!toggle)}
        />
      </div>
      {toggle && <NavLinks setToggle={setToggle} />}
    </div>
  );
};

export default Navbar;
