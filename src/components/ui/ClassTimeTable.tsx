import React from "react";
import { TimeTableData } from "@/data/timeTables";

interface ScheduleType {
  [key: string]: {
    [key: string]: TimeTableData;
  };
}

const ClassTimeTable = ({
  data,
  category,
}: {
  data: TimeTableData[];
  category: string;
}) => {
  const uniqueTimes = [...new Set(data.map((item) => item.time))].sort();

  const schedule: ScheduleType = {};
  data.forEach((item) => {
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

  return (
    <section className="class-timetable-section class-details-timetable spad">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="class-details-timetable_title">
              <h5>Haftalık Program</h5>
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
                  {uniqueTimes.map((time, rowIndex) => (
                    <tr key={time}>
                      <td className="class-time">{time}</td>
                      {weekDays.map((day, colIndex) => {
                        const session = schedule[time]?.[day];
                        // Calculate total cell index: multiply row index by number of columns and add column index
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
                                  {category}
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
