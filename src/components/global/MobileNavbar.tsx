"use client";
import { useState } from "react";
import { navLinks } from "@/data/navLInks";
import Link from "next/link";
import Image from "next/image";
import logoImg from "@/app/assets/images/output.png";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <>
        <div
          onClick={() => setIsOpen(false)}
          className={`offcanvas-menu-overlay  ${isOpen ? "active" : ""}`}
        ></div>
        <div className="logo md:hidden">
          <Link href="/" aria-label="KULÜP" className="col-lg-4 ">
            <Image
              width={80}
              height={40}
              src={logoImg}
              alt="Altın Eller Spor Kulübü"
            />
          </Link>
        </div>
        <div
          className={`offcanvas-menu-wrapper text-black ${
            isOpen ? "show-offcanvas-menu-wrapper" : "canvas-close"
          }`}
        >
          <div className="canvas-close">
            <i onClick={() => setIsOpen(false)} className="fa fa-close"></i>
          </div>

          <div id="mobile-menu-wrap">
            <nav className="">
              <ul>
                {navLinks.map((link) => {
                  return (
                    <li
                      className="mb-2 border-b-2 border-primary p-1"
                      key={link.label}
                    >
                      <a href={link.href}>{link.label}</a>
                    </li>
                  );
                })}
                {/* <li>
              <a href="#">Pages</a>
              <ul className="dropdown">
                <li>
                  <a href="./about-us.html">HAKKIMIZDA</a>
                </li>
                <li>
                  <a href="./class-timetable.html">SINIFLAR timetable</a>
                </li>
                <li>
                  <a href="./bmi-calculator.html">Bmi calculate</a>
                </li>
                <li>
                  <a href="./team.html">EKİBİMİZ</a>
                </li>
                <li>
                  <a href="./gallery.html">Gallery</a>
                </li>
                <li>
                  <a href="./blog.html">Our blog</a>
                </li>
                <li>
                  <a href="./404.html">404</a>
                </li>
              </ul>
            </li> */}
              </ul>
            </nav>
          </div>
          <div className="canvas-social">
            <a href="#">
              <i className="fa fa-facebook"></i>
            </a>
            <a href="#">
              <i className="fa fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fa fa-youtube-play"></i>
            </a>
            <a href="#">
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </div>
      </>

      <div onClick={() => setIsOpen(true)} className="canvas-open">
        <i className="fa fa-bars"></i>
      </div>
    </>
  );
}
