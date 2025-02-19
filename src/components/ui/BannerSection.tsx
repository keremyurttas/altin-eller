type Props = {
  title: string;
  subtitle: string;
  buttonText: string;
  backgroundUrl: string;
};
export default function BannerSection(Props: Props) {
  return (
    <section
      className="banner-section relative flex items-center justify-center"
      style={{
        backgroundImage: `url(${Props.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Grayish Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="container relative z-10">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="bs-text text-white">
              <h2 className="text-4xl font-bold leading-tight">{Props.title}</h2>
              <div className="bt-tips text-lg mt-2 font-mulish">
                {Props.subtitle}
              </div>
              <a href="/contact-us#register-form" className="primary-btn btn-normal mt-4 inline-block">
                {Props.buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
