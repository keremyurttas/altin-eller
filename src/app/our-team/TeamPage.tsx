"use client";
import BreadCrumbSection from "@/components/ui/BreadCrumbSection";
import PageLayout from "@/components/ui/PageLayout";
import { ourTeam } from "@/data/breadCrumbs";

import { TeamMember } from "@/lib/notion";
import { Loader2 } from "lucide-react";

import { useState, useEffect } from "react";

export default function Page() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch("/api/get-team-members")
      .then((response) => response.json())
      .then((data) => {
        setTeamMembers(data);
        setLoading(false);
      });
  }, []);
  return (
    <PageLayout>
      <BreadCrumbSection {...ourTeam} />
      <section className="team-section team-page spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="team-title">
                <div className="section-title">
                  <span>Ekibimiz</span>
                  <h2>PROFESYONELLERLE ÇALIŞIN</h2>
                </div>
                <a href="#" className="primary-btn btn-normal appoinment-btn">
                  KAYIT OL
                </a>
              </div>
            </div>
          </div>
          <div className="row items-center flex justify-center">
            {teamMembers.length == 0 && loading ? (
              <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-white" />
              </div>
            ) : (
              <>
                {teamMembers.map((member, index) => {
                  return (
                    <div key={index} className="col-lg-4 col-sm-6 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
                      <div
                        className="ts-item set-bg"
                        style={{
                          backgroundImage: `url(${member.imageUrl})`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      >
                        <div className="ts_text team-page-text !-bottom-8">
                          <h3>{member.name}</h3>
                          <span className="text-primary">{member.title}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
