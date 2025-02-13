import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import RegistrationForm from "@/components/ui/NewStudentForm";
import NewStudentForm from "@/components/ui/NewStudentForm";
import { contactUs } from "@/data/breadCrumbs";
import { getTouch } from "@/data/getTouch";

export default function Page() {
  return (
    <>
      <BreadCrumbSection {...contactUs} />
      <section className="contact-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-title contact-title">
                <span>Contact Us</span>
                <h2>GET IN TOUCH</h2>
              </div>
              <div className="contact-widget">
                <div className="cw-text flex items-center">
                  <i className="fa fa-map-marker"></i>
                  <a
                    href={`https://www.google.com/maps/search/?q=${encodeURIComponent(
                      getTouch.address
                    )}`}
                  >
                    {getTouch.address}
                    <br /> {getTouch.postalCode}
                  </a>
                </div>
                <div className="cw-text flex items-center">
                  <i className="fa fa-mobile"></i>
                  <a href={`tel:${getTouch.phone}`}>{getTouch.phone}</a>
                </div>
                <div className="cw-text email flex items-center">
                  <i className="fa fa-envelope"></i>
                  <a href={`mailto:${getTouch.email}`}>{getTouch.email}</a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <RegistrationForm />
            </div>
          </div>
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.9557262768853!2d28.974696976044797!3d41.091813971338915!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab695e4e070fb%3A0x55b85726abfc1e97!2s%C4%B0stanbul%20Vali%20Hayri%20Kozak%C3%A7%C4%B1o%C4%9Flu%20Mesleki%20ve%20Teknik%20Anadolu%20Lisesi!5e0!3m2!1str!2str!4v1739376033519!5m2!1str!2str"
              height="550"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
