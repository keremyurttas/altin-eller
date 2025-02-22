import Image from "next/image";
import React from "react";
import { Service } from "@/lib/types";

export default function ServiceSection({ services }: { services: Service[] }) {
  return (
    <section className="services-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>en iyiye doğru</span>
              <h2>hırsla, azimle, coşkuyla</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-y-4 lg:gap-0">
          {services.map((service, index) => (
            <React.Fragment key={index}>
              <div
                className={`order-${service.order} order-lg-${service.order}`}
              >
                <Image
                  width={0}
                  height={0}
                  layout="responsive"
                  className="w-full !h-full"
                  src={service.image}
                  alt={`${service.title} - ${service.description}`}
                  priority={index === 0} // Load the first image with priority
                />
              </div>
              <div
                className={`order-${service.order + 1} order-lg-${
                  service.order + (index > 1 ? -1 : 1)
                } flex flex-col justify-center`}
              >
                <div className={"ss-text" + (index > 1 ? " second-row" : "")}>
                  <h3 className="text-lg font-bold">{service.title}</h3>
                  <p className="text-gray-400 text-sm">{service.description}</p>
                  <a href="#" className="text-blue-500 hover:underline">
                    Keşfet
                  </a>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
