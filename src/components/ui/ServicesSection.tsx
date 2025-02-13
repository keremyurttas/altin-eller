import Image from "next/image";
import React from "react";
import { Service } from "@/data/services";
export default function ServiceSection({ services }: { services: Service[] }) {
  return (
    <section className="services-section spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <span>What we do?</span>
              <h2>PUSH YOUR LIMITS FORWARD</h2>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
          {services.map((service, index) => (
            <React.Fragment key={index}>
              <div
                className={`p-0 ${index < 2} order-${service.order} lg:order-${
                  service.order
                }`}
              >
                <Image
                  width={0}
                  height={0}
                  layout="responsive"
                  className="w-full !h-full"
                  src={service.image}
                  alt={service.title}
                />
              </div>
              <div
                className={`p-0 ${
                  index > 1
                    ? `order-${service.order + 1} lg:order-${service.order - 1}`
                    : `order-${service.order + 1} lg:order-${service.order + 1}`
                } flex flex-col justify-center`}
              >
                <div className={"ss-text" + (index > 1 ? " second-row" : "")}>
                  <h4 className="text-lg font-bold">{service.title}</h4>
                  <p className="text-gray-600 text-sm">{service.description}</p>
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
