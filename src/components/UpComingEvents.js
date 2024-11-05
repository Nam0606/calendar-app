import React from "react";

const UpComingEvents = ({ event }) => {
  return (
    <div className="border border-[#99b5cd] rounded-md flex">
      <div
        className={`w-2 bg-${event.label}-500 rounded-tl-md rounded-bl-md`}
      ></div>
      <div className="p-3">
        <div className="text-[#1e5782] font-bold">{event.title}</div>
        <div>
          {event.timeFrom} - {event.timeTo} GMT +8
        </div>
        <a
          className="text-[#1e5782] underline text-sm py-1 cursor-pointer"
          href="https://www.masterbranch.co/"
          target="__blank"
        >
          View Client Profile
        </a>
      </div>
    </div>
  );
};

export default UpComingEvents;
