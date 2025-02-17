import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import ClassCategories from "@/components/ui/ClassCategories";
import { basketballClasses } from "@/data/breadCrumbs";
import Image from "next/image";
import { basketballClassesCategories } from "@/data/classCategories";
import ClassTimeTable from "@/components/ui/ClassTimeTable";
import { basketballTimeTableData } from "@/data/timeTables";
export default function BasketballClasses() {
  return (
    <>
      <BreadCrumbSection {...basketballClasses} />
      <section className="class-details-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="class-details-text">
                <div className="cd-pic">
                  {/* <img src="img/classes/class-details/class-detailsl.jpg" alt=""> */}
                  <Image
                    layout="responsive"
                    width={0}
                    height={0}
                    src={
                      "https://ik.imagekit.io/dyw3rzban/K%C3%9C%C3%87%C3%9CK%20A/_IGP5264.JPG?updatedAt=1739119467711"
                    }
                    alt="img"
                  ></Image>
                </div>
                <div className="cd-text">
                  <div className="cd-single-item">
                    <h3>Body buiding</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure Lorem ipsum dolor sit amet, consectetur
                      adipisicing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua accusantium doloremque
                      laudantium. Excepteur sint occaecat cupidatat non proident
                      sculpa.
                    </p>
                  </div>
                  <div className="cd-single-item">
                    <h3>Trainer</h3>
                    <p>
                      Dolor sit amet, consectetur adipisicing elit, sed do
                      eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                      Duis aute irure dolor in reprehenderit in voluptate velit
                      esse cillum dolore eu fugiat nulla pariatur officia
                      deserunt mollit.
                    </p>
                  </div>
                </div>
                <div className="cd-trainer">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="cd-trainer-pic">
                        {/* <img src="img/classes/class-details/trainer-profile.jpg" alt=""> */}
                        <Image
                          layout="responsive"
                          width={0}
                          height={0}
                          src={
                            "https://ik.imagekit.io/dyw3rzban/K%C3%9C%C3%87%C3%9CK%20A/_IGP5264.JPG?updatedAt=1739119467711"
                          }
                          alt="img"
                        ></Image>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="cd-trainer-text">
                        <div className="trainer-title">
                          <h4>Athart Rachel</h4>
                          <span>Gym Trainer</span>
                        </div>
                        <div className="trainer-social">
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
                          <a href="#">
                            <i className="fa  fa-envelope-o"></i>
                          </a>
                        </div>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua viverra maecenas lacus vel
                          facilisis.
                        </p>
                        <ul className="trainer-info">
                          <li>
                            <span>Age</span>35
                          </li>
                          <li>
                            <span>Weight</span>148lbs
                          </li>
                          <li>
                            <span>Height</span>10' 2``
                          </li>
                          <li>
                            <span>Occupation</span>no-founder
                          </li>
                        </ul>
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua viverra maecenas lacus vel
                          facilisis.{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-8">
              <div className="sidebar-option">
                <ClassCategories categories={basketballClassesCategories} />
                <div
                  className="so-banner set-bg"
                  style={{
                    backgroundImage: `url(https://ik.imagekit.io/dyw3rzban/M%C4%B0N%C4%B0K%20TAKIM/_IGP5496.JPG?updatedAt=1739119318202)`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <h5>Banner 300x300</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ClassTimeTable category="basketball" />
    </>
  );
}
