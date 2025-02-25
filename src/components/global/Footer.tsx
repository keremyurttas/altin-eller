import Link from "next/link";
import Image from "next/image";
import logoImg from "@/app/assets/images/altineller-logo.webp";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {
  return (
    <footer
      className="bg-[#080808] py-8 w-full min-h-[10vh] flex-shrink-0"
      role="contentinfo"
    >
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          {/* Logo */}
          <div className="flex-shrink-0 w-[120px] h-[120px]">
            <Link href="/" className="block" aria-label="Ana Sayfa">
              <Image
                width={120}
                height={120}
                priority
                src={logoImg}
                alt="Altıneller Spor Kulübü Logo"
                className="w-full h-full object-contain"
              />
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex gap-6 flex-shrink-0">
            <SocialLinks size="large" />
          </div>

          {/* Club Name */}
          <div className="text-center md:text-right min-h-[60px] flex items-center justify-center">
            <h1 className="font-oswald text-white">
              <strong className="text-primary text-2xl md:text-4xl block mb-2">
                Altıneller
              </strong>
              <span className="text-lg md:text-xl">Spor Kulübü</span>
            </h1>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm min-h-[20px]">
            Bu websitesinin tüm hakları Altıneller Spor Kulübüne aittir. ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
