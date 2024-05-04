import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  getMonth,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addDays,
  startOfWeek,
  format,
} from "date-fns";
import Link from "next/link";

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

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
        <Col key={day} className="p-2 border text-center">
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
          <Row key={day} className="mb-1">
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
      <h1 className="text-center">Calendar</h1>
      {renderCalendar()}
    </Container>
  );
}
