import Link from "next/link";
type Props = {
  title: string;
  targetLink: string;
  backgroundUrl: string;
};
export default function BreadCrumbSection(crumbDetails: Props) {
  return (
    <section
      className="breadcrumb-section set-bg"
      style={{
        backgroundImage: `url(${crumbDetails.backgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="breadcrumb-text">
              <h2>{crumbDetails.title}</h2>
              <div className="bt-option">
                <Link href={crumbDetails.targetLink}>Anasayfa</Link>
                <span>{crumbDetails.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
