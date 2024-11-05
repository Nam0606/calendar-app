import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const Day = ({ day }) => {
  const {
    monthIndex,
    setDaySelected,
    setShowEventModal,
    savedEvents,
    setSelectEvent,
  } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = savedEvents.filter(
      (event) =>
        dayjs(event.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [savedEvents, day]);

  const isNotCurrentMonth = () => {
    if (
      dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM") ===
      day.format("MMMM")
    ) {
      return "";
    } else {
      return "gray";
    }
  };

  const getCurrentDayClass = () => {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  };

  return (
    <div className="border border-gray-200 flex flex-col hover:bg-gray-100">
      <header className="flex flex-col items-center">
        <p
          className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()} text-${isNotCurrentMonth()}-400`}
        >
          {day.format("DD")}
        </p>
      </header>
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          setDaySelected(day);
          setSelectEvent(null);
          setShowEventModal(true);
        }}
      >
        {dayEvents.map((event, idx) =>
          idx < 2 ? (
            <div
              key={idx}
              onClick={(e) => {
                setSelectEvent(event);
                setDaySelected(day);
                e.stopPropagation();
                setShowEventModal(true);
              }}
              className={`bg-${event.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
            >
              {event.title}
            </div>
          ) : (
            ""
          )
        )}
        {dayEvents.length >= 2 && (
          <div className="text-[12px] pl-1">
            and {dayEvents.length - 2} more
          </div>
        )}
      </div>
    </div>
  );
};

export default Day;
