import Link from "next/link";
import logoImg from "@/app/assets/images/altineller-logo.svg";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";
import { navLinks } from "@/data/navLInks";
import SocialLinks from "../ui/SocialLinks";
import ActiveLink from "./Navbar/ActiveLink";
export default function Navbar() {
  return (
    <header className="header-section">
      <MobileNavbar />
      <div className="container-fluid hidden lg:block ">
        <div className="row">
          <div className="col-lg-3">
            <div className="logo hidden lg:block">
              <Link href="/" aria-label="KULÜP">
                <Image
                  width={120}
                  src={logoImg}
                  alt="Altın Eller Spor Kulübü"
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <nav className="nav-menu">
              <ul className="">
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
