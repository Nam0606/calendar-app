import React, { useContext, useEffect, useState } from "react";
import SmallerCalendar from "./SmallerCalendar";
import GlobalContext from "../context/GlobalContext";
import UpComingEvents from "./UpComingEvents";
import dayjs from "dayjs";

const SideBar = () => {
  const {
    daySelected,
    savedEvents,
    setSelectEvent,
    setShowEventModal,
  } = useContext(GlobalContext);
  const [dayEvents, setDayEvents] = useState([]);

  useEffect(() => {
    const events = savedEvents.filter(
      (event) =>
        dayjs(event.day).format("DD-MM-YY") ===
        daySelected.format("DD-MM-YY")
    );

    setDayEvents(events);
  }, [savedEvents, daySelected]);
  return (
    <aside className="border p-5 w-80 bg-white">
      <SmallerCalendar />

      <div className="flex justify-between items-center pt-10">
        <h1 className="text-[#1e5786] font-bold">Upcoming Events</h1>
        <button className="bg-[#1e5786] text-white rounded-xl px-2 py-1 text-sm">
          View All
        </button>
      </div>
      <div className="text-gray-500 text-sm my-1">
        {daySelected.format("DD MMM")}
      </div>
      <div>
        {dayEvents.map((event, i) => (
          <div
            key={i}
            className="pb-2"
            onClick={() => {
              setSelectEvent(event);
              setShowEventModal(true);
            }}
          >
            <UpComingEvents event={event} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
