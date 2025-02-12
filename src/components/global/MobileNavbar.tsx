"use client";
import { useState } from "react";
import { navLinks } from "@/data/navLInks";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/app/assets/images/output.png";
import SocialLinks from "../ui/SocialLinks";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (label: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  return (
    <>
      {/* Overlay for closing the menu */}
      <div
        onClick={() => setIsOpen(false)}
        className={`offcanvas-menu-overlay ${isOpen ? "active" : ""}`}
      ></div>

      {/* Mobile Logo */}
      <div className="logo md:hidden">
        <Link href="/" aria-label="KULÜP">
          <Image
            width={80}
            height={40}
            src={logoImg}
            alt="Altın Eller Spor Kulübü"
          />
        </Link>
      </div>

      {/* Offcanvas Menu */}
      <div
        className={`offcanvas-menu-wrapper text-black ${
          isOpen ? "show-offcanvas-menu-wrapper" : "canvas-close"
        }`}
      >
        <div className="canvas-close">
          <i onClick={() => setIsOpen(false)} className="fa fa-close"></i>
        </div>

        {/* Navigation */}
        <div id="mobile-menu-wrap">
          <nav>
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className={`border-b border-black pb-2 ${
                    index === navLinks.length - 1 ? "border-none" : ""
                  } ${openDropdowns[link.label] ? "!pb-0" : ""}`}
                >
                  {link.dropdown ? (
                    <>
                      <button
                        role="menuitem"
                        aria-haspopup="true"
                        aria-expanded={openDropdowns[link.label]}
                        tabIndex={0}
                        className={`flex justify-between items-center cursor-pointer ${
                          openDropdowns[link.label] ? "text-primary" : ""
                        }`}
                        onClick={() => toggleDropdown(link.label)}
                      >
                        {link.label}
                        <span
                          className={`slicknav_arrow transition-transform duration-300 ${
                            openDropdowns[link.label]
                              ? "rotate-0"
                              : "rotate-[-90deg]"
                          }`}
                        >
                          ▼
                        </span>
                      </button>
                      <ul
                        className={`dropdown ${
                          openDropdowns[link.label] ? "active" : "hidden"
                        }`}
                      >
                        {link.dropdown.map((subLink, subIndex) => (
                          <li
                            key={subIndex}
                            className={`pl-4 border-b border-primary pb-1 last:border-none text-primary`}
                          >
                            <Link
                              onClick={() => setIsOpen(false)}
                              href={subLink.href}
                            >
                              {subLink.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link onClick={() => setIsOpen(false)} href={link.href}>
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Social Links */}
        <div className="canvas-social">
          <SocialLinks size="small" />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div onClick={() => setIsOpen(true)} className="canvas-open">
        <i className="fa fa-bars"></i>
      </div>
    </>
  );
}
