import moment from "moment";
import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 35rem;
  height: fit-content;
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.15);
`;

const MonthPicker = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 2rem;
  user-select: none;
  -webkit-user-drag: none;
`;

const MonthPickerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: none;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.15);
  transition: all 200ms ease;

  &:hover {
    cursor: pointer;
  }

  &:active {
    filter: brightness(90%);
    transition: all 200ms ease;
  }
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-row-gap: 1rem;
`;

const DayName = styled.div`
  text-align: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.fadedDateTextColor};
  user-select: none;
  -webkit-user-drag: none;
`;

const DayButton = styled.button`
  justify-self: center;
  width: 3rem;
  height: 3rem;
  padding: 0;
  border: none;
  border-radius: 5px;
  font-size: 1.5rem;
  color: ${(props) => props.theme.textColor};
  background-color: transparent;
  user-select: none;
  -webkit-user-drag: none;

  &.selected {
    color: ${(props) => props.theme.selectedDateTextColor};
    background-color: ${(props) => props.theme.selectedDateColor};
  }

  &.faded {
    color: ${(props) => props.theme.fadedDateTextColor};
  }

  &:hover {
    cursor: pointer;
  }
`;

const defaultTheme = {
  fadedDateTextColor: "#cacbcc",
  selectedDateColor: "#2b99c0",
  selectedDateTextColor: "#ffffff",
  bgColor: "#ffffff",
  textColor: "#000000",
};

export default function Datepicker({
  controlledDate,
  setControlledDate,
  theme = defaultTheme,
}) {
  const [displayedDate, setDisplayedDate] = useState(controlledDate);

  function selectDay(day, monthOffset) {
    const updatedMoment = displayedDate
      .clone()
      .add(monthOffset, "month")
      .date(day);
    setDisplayedDate(updatedMoment);
    setControlledDate(updatedMoment);
  }

  function getWeekdaysNamesElements() {
    return moment.weekdaysMin().map((dayName) => <DayName>{dayName}</DayName>);
  }

  function getPreviousMonthElements() {
    const firstWeekdayOfMonth = displayedDate.clone().startOf("month").day();
    const numberOfDaysInPreviousMonth = displayedDate
      .clone()
      .subtract(1, "month")
      .daysInMonth();

    const daysOfPreviousMonth = Array(firstWeekdayOfMonth)
      .fill(numberOfDaysInPreviousMonth - firstWeekdayOfMonth)
      .map((value, index) => value + index + 1);

    return daysOfPreviousMonth.map((day) => (
      <DayButton className="faded" onClick={() => selectDay(day, -1)}>
        {day}
      </DayButton>
    ));
  }

  function getCurrentMonthElements() {
    const numberOfDaysInCurrentMonth = displayedDate.clone().daysInMonth();
    const daysOfCurrentMonth = Array(numberOfDaysInCurrentMonth)
      .fill(1)
      .map((value, index) => value + index);

    return daysOfCurrentMonth.map((day) => (
      <DayButton
        className={
          displayedDate.clone().date(day).isSame(controlledDate, "date")
            ? "selected"
            : ""
        }
        onClick={() => selectDay(day)}
      >
        {day}
      </DayButton>
    ));
  }

  function getNextMonthElements() {
    const lastWeekdayOfMonth = displayedDate.clone().endOf("month").day();
    const daysOfNextMonth = Array(6 - lastWeekdayOfMonth)
      .fill(1)
      .map((value, index) => value + index);

    return daysOfNextMonth.map((day) => (
      <DayButton className="faded" onClick={() => selectDay(day, 1)}>
        {day}
      </DayButton>
    ));
  }

  function getDaysGridElements() {
    return [
      ...getWeekdaysNamesElements(),
      ...getPreviousMonthElements(),
      ...getCurrentMonthElements(),
      ...getNextMonthElements(),
    ];
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container>
        <MonthPicker>
          <MonthPickerButton
            onClick={() =>
              setDisplayedDate((cd) => cd.clone().subtract(1, "months"))
            }
          >
            <BsChevronLeft />
          </MonthPickerButton>
          {displayedDate.format("MMMM YYYY")}
          <MonthPickerButton
            onClick={() =>
              setDisplayedDate((cd) => cd.clone().add(1, "months"))
            }
          >
            <BsChevronRight />
          </MonthPickerButton>
        </MonthPicker>
        <DaysGrid>{getDaysGridElements()}</DaysGrid>
      </Container>
    </ThemeProvider>
  );
}
