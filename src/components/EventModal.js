import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContext";

const labelsClass = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];
const EventModal = () => {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectEvent,
  } = useContext(GlobalContext);
  const [title, setTitle] = useState(
    selectEvent ? selectEvent.title : ""
  );
  const [description, setDescription] = useState(
    selectEvent ? selectEvent.description : ""
  );
  const [selectedColor, setSelectedColor] = useState(
    selectEvent ? selectEvent.label : labelsClass[0]
  );
  const [timeFrom, setTimeFrom] = useState(
    selectEvent ? selectEvent.timeFrom : "00:00"
  );
  const [timeTo, setTimeTo] = useState(
    selectEvent ? selectEvent.timeTo : "00:00"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedColor,
      day: daySelected.valueOf(),
      timeFrom,
      timeTo,
      id: selectEvent ? selectEvent.id : Date.now(),
    };
    if (selectEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModal(false);
  };
  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
          <span className="material-icons-outlined text-gray-400">
            drag_handle
          </span>
          <div>
            {selectEvent && (
              <span
                onClick={() => {
                  dispatchCalEvent({
                    type: "delete",
                    payload: selectEvent,
                  });
                  setShowEventModal(false);
                }}
                className="material-icons-outlined text-gray-400 cursor-pointer"
              >
                delete
              </span>
            )}
            <button
              onClick={() => {
                setShowEventModal(false);
              }}
            >
              <span className="material-icons-outlined text-gray-400">
                close
              </span>
            </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="title"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="pt-3 border-0 text-gray-600 font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0"
            />
            <span className="material-icons-outlined text-gray-400">
              schedule
            </span>
            <p>
              {/* {daySelected.format("dddd, MMMM DD")}{" "} */}
              <input
                type="time"
                name="timeFrom"
                min="00:00"
                max="23:59"
                onChange={(e) => {
                  setTimeFrom(e.target.value);
                }}
                value={timeFrom}
                required
              />
              <span> - </span>
              <input
                type="time"
                name="timeTo"
                min="00:00"
                max="23:59"
                onChange={(e) => {
                  setTimeTo(e.target.value);
                }}
                value={timeTo}
                required
              />
            </p>

            <span className="material-icons-outlined text-gray-400">
              segment
            </span>
            <input
              type="text"
              name="description"
              placeholder="Add description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pt-3 border-0 text-gray-600 font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0"
            />

            <span className="material-icons-outlined text-gray-400">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelsClass.map((color, i) => (
                <span
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`bg-${color}-500 w-6 h-6 rounded-full flex items-center cursor-pointer justify-center`}
                >
                  {selectedColor === color && (
                    <span className="material-icons-outlined text-white text-sm">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
};

export default EventModal;
