import Day from "./Day";
import React, { useContext } from "react";
import GlobalContext from "../context/GlobalContext";
import dayjs from "dayjs";

const Month = ({ month }) => {
  const { monthIndex, setMonthIndex } = useContext(GlobalContext);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };

  const handleReset = () => {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  };
  return (
    <div className="h-[100%] w-[100%] bg-white">
      <div className="flex items-center p-2">
        <button
          className="border border-[#99b5cd] rounded-xl py-2 px-4 mr-5 text-[#0d2941]"
          onClick={handleReset}
        >
          Today
        </button>
        <button onClick={handlePrevMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_left
          </span>
        </button>
        <button onClick={handleNextMonth}>
          <span className="material-icons-outlined cursor-pointer text-gray-600 mx-2">
            chevron_right
          </span>
        </button>
        <h2 className="ml-4 text-xl text-[#1e5786] font-bold">
          {dayjs(new Date(dayjs().year(), monthIndex)).format(
            "MMMM YYYY"
          )}
        </h2>
      </div>
      <div className="flex-1 grid grid-cols-7 grid-rows-1 py-5">
        {month[0].map((day, i) => (
          <span
            key={i}
            className="text-md py-1 text-center h-4 text-gray-500"
          >
            {day.format("ddd")}
          </span>
        ))}
      </div>

      <div className="flex-1 grid grid-cols-7 grid-rows-5 h-[85%] w-[100%]">
        {month.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((day, index) => (
              <Day day={day} key={index} />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Month;
