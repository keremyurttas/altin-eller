import { getTouch } from "@/data/getTouch";
export default function GetTouchSection() {
  return (
    <div className="gettouch-section ">
      <div className="container">
        <div className="row text-white flex justify-between px-4">
          <div className=" col-md-4">
            <div className="gt-text flex items-center">
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
          </div>
          <div className="col-md-4">
            <div className="gt-text flex items-center">
              <i className="fa fa-mobile"></i>
              <a href={`tel:${getTouch.phone}`}>{getTouch.phone}</a>
            </div>
          </div>
          <div className="col-md-4">
            <div className="gt-text email flex items-center">
              <i className="fa fa-envelope"></i>
              <a href={`mailto:${getTouch.email}`}>{getTouch.email}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
