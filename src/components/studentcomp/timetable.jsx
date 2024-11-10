import React from "react";
import { Table } from "antd";

const Timetable = ({ userDetails }) => {
  const { timetable } = userDetails.panel;

  // Define the possible 1-hour time slots
  const timeSlots = [
    "8:30 - 9:30",
    "9:30 - 10:30",
    "10:45 - 11:45",
    "11:45 - 12:45",
    "1:30 - 2:30",
    "2:30 - 3:30",
    "3:30 - 4:30",
  ];

  // Initialize timetable data for each day of the week with empty time slots
  const timetableData = [
    { day: "Monday", slots: Array(timeSlots.length).fill("") },
    { day: "Tuesday", slots: Array(timeSlots.length).fill("") },
    { day: "Wednesday", slots: Array(timeSlots.length).fill("") },
    { day: "Thursday", slots: Array(timeSlots.length).fill("") },
    { day: "Friday", slots: Array(timeSlots.length).fill("") },
  ];

  // Map subjects to timetable slots
  timetable.forEach((session) => {
    const dayIndex = timetableData.findIndex(
      (item) => item.day === session.day
    );
    if (dayIndex !== -1) {
      // Find the index of the time slot in the timeSlots array
      const slotIndex = timeSlots.findIndex((slot) => slot === session.timing);
      if (slotIndex !== -1) {
        // If the session is a 2-hour class, fill two consecutive slots
        if (
          session.timing === "8:30 - 10:30" ||
          session.timing === "10:45 - 12:45" ||
          session.timing === "1:30 - 3:30"
        ) {
          timetableData[dayIndex].slots[slotIndex] = session.subject.name;
          timetableData[dayIndex].slots[slotIndex + 1] = session.subject.name; // Fill the next time slot
        } else {
          timetableData[dayIndex].slots[slotIndex] = session.subject.name;
        }
      }
    }
  });

  // Columns for the table: Time slots and Days of the week
  const timetableColumns = [
    { title: "Day", dataIndex: "day", key: "day" },
    ...timeSlots.map((slot, index) => ({
      title: slot,
      dataIndex: `slot${index}`,
      key: `slot${index}`,
    })),
  ];

  // Data source for the table with time slots for each day
  const tableData = timetableData.map((dayData) => {
    const row = { day: dayData.day };
    dayData.slots.forEach((slot, index) => {
      row[`slot${index}`] = slot;
    });
    return row;
  });

  return (
    <Table
      columns={timetableColumns}
      dataSource={tableData}
      pagination={false}
      rowKey="day"
      bordered
    />
  );
};

export default Timetable;
