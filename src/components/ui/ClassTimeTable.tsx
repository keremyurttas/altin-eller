"use client";
import React, { useEffect, useState } from "react";
import type { VolleyballSchedule } from "@/lib/notion";

const normalizeTimeFormat = (timeString: string) => {
  return timeString.replace(".", ":"); // Convert 14.00 to 14:00
};

const convertTimeToMinutes = (timeString: string) => {
  const normalizedTime = normalizeTimeFormat(timeString);
  const [hours, minutes] = normalizedTime.split(":").map(Number);
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
        console.log(data);
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
  const uniqueTimes = [
    ...new Set(scheduleData.map((item) => normalizeTimeFormat(item.time))),
  ];

  // Sort times by converting to minutes for proper comparison
  const sortedTimes = uniqueTimes.sort(
    (a, b) => convertTimeToMinutes(a) - convertTimeToMinutes(b)
  );

  scheduleData.forEach((item) => {
    const formattedTime = normalizeTimeFormat(item.time);
    if (!schedule[formattedTime]) {
      schedule[formattedTime] = {};
    }
    schedule[formattedTime][item.day] = item;
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

  if (loading) {
    return <div className="container text-center py-8">Yükleniyor...</div>;
  }

  if (error) {
    return (
      <div className="container text-center py-8 text-red-500">{error}</div>
    );
  }

  if (scheduleData.length === 0) {
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
              <h4 className="text-center">Haftalık Ders Programımız</h4>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="class-timetable details-timetable h-[50vh] overflow-auto">
              <table className="max-h overflow-auto relative">
                <thead className="sticky top-0">
                  <tr >
                    <th className="bg-opacity-50 bg-transparent"></th>
                    {weekDays.map((day) => (
                      <th   key={day}>{day}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sortedTimes.map((time,rowIndex) => (
                    <tr key={time}>
                      <td className="class-time px-1">{time}</td>
                      {weekDays.map((day,colIndex) => {
                        const session = schedule[time]?.[day];
                        const totalIndex =
                        rowIndex * weekDays.length + colIndex;
                        return (
                          <td
                            key={`${day}-${time}`}
                            className={`${
                              totalIndex % 2 === 0 ? "dark-bg" : ""
                            } ${session ? "hover-dp ts-meta" : "blank-td"} px-1 max-h-2`
                          }
                            data-tsmeta={session?.category?.toLowerCase()}
                          >
                            {session && (
                              <>
                                <h5 className="md:text-base text-xs h-max">
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
