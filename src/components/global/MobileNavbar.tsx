"use client";
import { useState, useEffect } from "react";
import { navLinks } from "@/data/navLInks";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/app/assets/images/altineller-logo.webp";
import dynamic from "next/dynamic";

const SocialLinks = dynamic(() => import("../ui/SocialLinks"), { ssr: false });

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden"); // Cleanup on unmount
    };
  }, [isOpen]);

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
        aria-hidden={!isOpen}
      ></div>

      {/* Mobile Logo */}
      <div className="logo lg:hidden">
        <Link href="/" aria-label="Ana Sayfa">
          <Image
            width={80}
            height={40}
            src={logoImg}
            alt="Altın Eller Spor Kulübü"
            priority
          />
        </Link>
      </div>

      {/* Offcanvas Menu */}
      <div
        className={`offcanvas-menu-wrapper text-black ${
          isOpen ? "show-offcanvas-menu-wrapper" : "canvas-close"
        }`}
      >
        <div className="canvas-close flex items-center justify-center">
          <i
            onClick={() => setIsOpen(false)}
            className="fa fa-close"
            aria-label="Kapat"
          ></i>
        </div>

        {/* Navigation */}
        <nav role="navigation">
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
                          className="pl-4 border-b border-primary pb-1 last:border-none text-primary"
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

        {/* Social Links */}
        <div className="canvas-social">
          <SocialLinks size="small" />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="canvas-open lg:hidden flex items-center justify-center"
        aria-label="Menüyü aç"
      >
        <i className="fa fa-bars"></i>
      </button>
    </>
  );
}
