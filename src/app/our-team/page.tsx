"use client";
import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import { ourTeam } from "@/data/breadCrumbs";

import { TeamMember } from "@/lib/notion";
import { useState, useEffect } from "react";

export default function Page() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  useEffect(() => {
    fetch("/api/get-team-members")
      .then((response) => response.json())
      .then((data) => {
        setTeamMembers(data);
        console.log(data);
      });
  }, []);
  return (
    <>
      <BreadCrumbSection {...ourTeam} />
      <section className="team-section team-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Our Team</span>
                  <h2>TRAIN WITH EXPERTS</h2>
                </div>
                <a href="#" className="primary-btn btn-normal appoinment-btn">
                  appointment
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            {teamMembers.map((member, index) => {
              return (
                <div key={index} className="col-lg-4 col-sm-6">
                  <div
                    className="ts-item set-bg"
                    style={{
                      backgroundImage: `url(${member.imageUrl})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="ts_text">
                      <h4>{member.name}</h4>
                      <span className="text-primary">{member.title}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
