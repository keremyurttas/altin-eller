import Link from "next/link";
import Image from "next/image";
import logoImg from "@/app/assets/images/output.png";
import SocialLinks from "../ui/SocialLinks";

export default function Footer() {


  return (
    <footer className="bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex-shrink-0">
            <Link href="/" className="block" aria-label="KULÜP">
              <Image
                width={120}
                height={120}
                src={logoImg}
                alt="Altın Eller Spor Kulübü"
                className="w-auto object-contain"
              />
            </Link>
          </div>

          <div className="flex gap-6">
          <SocialLinks size="large"/>
          </div>

          <div className="text-center md:text-right">
            <h1 className="font-oswald text-white">
              <strong className="text-primary text-2xl md:text-4xl block mb-2">
                Altıneller
              </strong>
              <span className="text-lg md:text-xl">Spor Kulübü</span>
            </h1>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 text-sm">
            Bu websitesinin tüm hakları Altıneller Spor Kulübüne aittir. ©{" "}
            {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
