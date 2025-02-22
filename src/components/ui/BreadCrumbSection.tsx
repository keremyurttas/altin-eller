import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  targetLink: string;
  backgroundUrl: string;
};

export default function BreadCrumbSection({
  title,
  targetLink,
  backgroundUrl,
}: Props) {
  return (
    <section className="breadcrumb-section set-bg relative">
      {/* Optimized Background Image */}
      <div className="absolute top-0 left-0 h-full w-full">
        <Image
          src={backgroundUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          priority // Ensures it loads faster on first render
        />
      </div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 h-full w-full bg-black bg-opacity-50"></div>

      <div className="container relative z-10">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb-text">
              <h1 className="text-white">{title.toLocaleUpperCase("tr-TR")}</h1>
              <div className="bt-option">
                <Link href={targetLink} aria-label="Ana Sayfa">
                  Anasayfa
                </Link>
                <span>{title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
