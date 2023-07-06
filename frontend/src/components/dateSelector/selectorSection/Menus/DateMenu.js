import React from "react";

const DateMenu = ({ date, setDate, closeMenu }) => {
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div className="dateMenu">
      <input
        type="date"
        id="start"
        name="trip-start"
        value={date}
        onChange={handleDateChange}
        min={new Date()}
        max={new Date(new Date() + 365)}
      />
    </div>
  );
};

export default DateMenu;
