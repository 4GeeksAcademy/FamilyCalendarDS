import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  startOfWeek,
  format,
  addMonths,
  subMonths,
} from "date-fns";
import Link from "next/link";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to move to the next month
  const handleNextMonth = () => {
    setCurrentDate((current) => addMonths(current, 1));
  };

  // Function to move to the previous month
  const handlePreviousMonth = () => {
    setCurrentDate((current) => subMonths(current, 1));
  };

  const renderDaysOfWeek = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <Row className="text-center font-weight-bold">
        {days.map((day) => (
          <Col key={day} className="p-2 border">
            {day}
          </Col>
        ))}
      </Row>
    );
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = startOfWeek(addDays(monthEnd, 6));

    const daysArray = eachDayOfInterval({ start: startDate, end: endDate });

    let weeks = [];
    let days = [];

    daysArray.forEach((day) => {
      let dayFormatted = format(day, "d");
      days.push(
        <Col key={day.toISOString()} className="p-2 border text-center">
          <Link
            href={`/calendar/${dayFormatted}/${
              currentDate.getMonth() + 1
            }/${currentDate.getFullYear()}`}
          >
            {dayFormatted}
          </Link>
        </Col>
      );
      if (days.length === 7) {
        weeks.push(
          <Row key={day.toISOString()} className="mb-1">
            {days}
          </Row>
        );
        days = [];
      }
    });

    return weeks;
  };

  return (
    <Container>
      <h1 className="text-center">Calendar Page</h1>
      <div className="text-center my-3">
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
      </div>
      <div className="text-center mb-3">
        <Button onClick={handlePreviousMonth} className="mx-2">
          Previous Month
        </Button>
        <Button onClick={handleNextMonth}>Next Month</Button>
      </div>
      {renderDaysOfWeek()}
      {renderCalendar()}
    </Container>
  );
}
