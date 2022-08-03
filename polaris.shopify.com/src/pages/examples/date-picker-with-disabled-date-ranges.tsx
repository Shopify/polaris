import { DatePicker } from "@shopify/polaris";
import { useState, useCallback } from "react";
import { withPolarisExample } from "../../components/PolarisExampleWrapper";

function DatePickerExample() {
  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });
  const [selectedDates, setSelectedDates] = useState({
    start: new Date("Wed Feb 07 2018 00:00:00 GMT-0500 (EST)"),
    end: new Date("Sat Feb 10 2018 00:00:00 GMT-0500 (EST)"),
  });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    []
  );

  return (
    <DatePicker
      month={month}
      year={year}
      onChange={setSelectedDates}
      onMonthChange={handleMonthChange}
      selected={selectedDates}
      disableDatesBefore={new Date("Sat Feb 03 2018 00:00:00 GMT-0500 (EST)")}
      disableDatesAfter={new Date("Sun Feb 18 2018 00:00:00 GMT-0500 (EST)")}
      allowRange
    />
  );
}

export default withPolarisExample(DatePickerExample);
