import Link from "next/link";
import logoImg from "@/app/assets/images/altineller-logo.webp";
import Image from "next/image";
import dynamic from "next/dynamic";
import { navLinks } from "@/data/navLInks";
import SocialLinks from "../ui/SocialLinks";
import ActiveLink from "./Navbar/ActiveLink";

const MobileNavbar = dynamic(() => import("./MobileNavbar"));

export default function Navbar() {
  return (
    <header className="header-section">
      <MobileNavbar />
      <div className="container-fluid hidden lg:block ">
        <div className="row">
          <div className="col-lg-3">
            <div className="logo hidden lg:block">
              <Link href="/" aria-label="Ana Sayfa">
                <Image
                  width={120}
                  height={60}
                  src={logoImg}
                  alt="Altın Eller Spor Kulübü"
                  priority
                  quality={90}
                  className="w-[120px] h-auto"
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <nav role="navigation" className="nav-menu">
              <ul>
                {navLinks.map((link, index) => (
                  <ActiveLink key={index} link={link} />
                ))}
              </ul>
            </nav>
          </div>
          <div className="col-lg-3">
            <div className="top-option">
              <SocialLinks size="large" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
