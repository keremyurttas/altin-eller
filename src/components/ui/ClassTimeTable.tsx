"use client";
import React, { useEffect, useState } from "react";
import type { VolleyballSchedule } from "@/lib/notion";

const convertTimeToMinutes = (timeString: string) => {
  const [time] = timeString.split("-"); // Take only the start time "18:00" from "18:00-19:00"
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

interface ScheduleType {
  [key: string]: {
    [key: string]: VolleyballSchedule;
  };
}

const ClassTimeTable = ({ category }: { category: string }) => {
  const [scheduleData, setScheduleData] = useState<VolleyballSchedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/get-schedule?category=${category}`)
      .then((res) => res.json())
      .then((data) => {
        setScheduleData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError("Failed to load schedule");
        setLoading(false);
      });
  }, [category]);

  const schedule: ScheduleType = {};
  const uniqueTimes = [...new Set(scheduleData.map((item) => item.time))];

  // Sort times by converting to minutes for proper comparison
  const sortedTimes = uniqueTimes.sort((a, b) => {
    return convertTimeToMinutes(a) - convertTimeToMinutes(b);
  });

  scheduleData.forEach((item) => {
    if (!schedule[item.time]) {
      schedule[item.time] = {};
    }
    schedule[item.time][item.day] = item;
  });

  const weekDays = [
    "Pazartesi",
    "Salı",
    "Çarşamba",
    "Perşembe",
    "Cuma",
    "Cumartesi",
    "Pazar",
  ];

  const hasSchedules = scheduleData.length > 0;

  if (loading) {
    return <div className="container text-center py-8">Yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="container text-center py-8 text-red-500">{error}</div>
    );
  }

  if (!hasSchedules) {
    return (
      <div className="container text-center py-8">
        Henüz program bulunmamaktadır.
      </div>
    );
  }

  return (
    <section className="class-timetable-section class-details-timetable spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="class-details-timetable_title">
              <h5 className="text-center">Haftalık Ders Programımız</h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="class-timetable details-timetable">
              <table>
                <thead>
                  <tr>
                    <th></th>
                    {weekDays.map((day) => (
                      <th key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedTimes.map((time, rowIndex) => (
                    <tr key={time}>
                      <td className="class-time">{time}</td>
                      {weekDays.map((day, colIndex) => {
                        const session = schedule[time]?.[day];
                        const totalIndex =
                          rowIndex * weekDays.length + colIndex;

                        return (
                          <td
                            key={`${day}-${time}`}
                            className={`${
                              totalIndex % 2 === 0 ? "dark-bg" : ""
                            } ${session ? "hover-dp ts-meta" : "blank-td"}`}
                            data-tsmeta={session?.category?.toLowerCase()}
                          >
                            {session && (
                              <>
                                <h5 className="md:text-base text-xs">
                                  {session.category}
                                </h5>
                                <span className="md:text-xs text-[.5rem] capitalize">
                                  {category === "volleyball"
                                    ? "Voleybol"
                                    : "Basketbol"}
                                </span>
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassTimeTable;
