import Link from "next/link";
import logoImg from "@/app/assets/images/output.png";
import Image from "next/image";
import MobileNavbar from "./MobileNavbar";
import { navLinks } from "@/data/navLInks";
import { headers } from "next/headers";
export default async function Navbar() {
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || "/"; // Get pathname from headers
  return (
    <>
      {/* // <!-- Offcanvas Menu Section End --> */}

      {/* // <!-- Header Section Begin --> */}
      <header className="header-section ">
        <MobileNavbar />
        <div className="container-fluid hidden md:block">
          <div className="row">
            <div className="col-lg-3">
              <div className="logo hidden md:block">
                <Link href="/" aria-label="KULÜP" className="col-lg-4">
                  <Image
                    width={100}
                    height={60}
                    src={logoImg}
                    alt="Altın Eller Spor Kulübü"
                  />
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <nav className="nav-menu">
                <ul>
                  {navLinks.map((link) => {
                    return (
                      <li
                        className={pathname === link.href ? "active" : ""}
                        key={link.label}
                      >
                        <a href={link.href}>{link.label}</a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <div className="col-lg-3">
              <div className="top-option">
                <div className="to-social">
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
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
