import React from "react";
import logo from "../assets/logo.png";
const CalendarHeader = () => {
  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="calendar" className="mr-2 w-12 h-12" />
      <h1 className="mr-10 text-xl text-[#1e5786] font-bold">
        Calendar
      </h1>
    </header>
  );
};

export default CalendarHeader;
