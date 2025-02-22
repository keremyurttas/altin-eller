import Image from "next/image";

type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundUrl: string;
};

export default function BannerSection({
  title,
  subtitle,
  buttonText,
  backgroundUrl,
}: Props) {
  return (
    <section
      role="banner"
      className="banner-section relative flex items-center justify-center"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={backgroundUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="object-cover"
        />
        {/* Grayish Overlay */}
        <div className="bg-black bg-opacity-50 inset-0 absolute"></div>
      </div>

      <div className="container relative z-10">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="bs-text text-white">
              <h2 className="text-4xl font-bold leading-tight">{title}</h2>
              <div className="bt-tips text-lg mt-2 font-mulish">{subtitle}</div>
              <a
                href="/contact-us#register-form"
                className="primary-btn btn-normal mt-4 inline-block transition duration-300 ease-in-out hover:bg-opacity-80"
              >
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
