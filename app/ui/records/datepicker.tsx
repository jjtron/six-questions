"use client"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

export default function DateTimePicker() {
  const customIdWhenProps = {
      textField: { id: "when", name: "when" }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-row place-content-center pb-2">
        <div className="flex flex-row px-1">
          <p className="font-semibold px-1">Date</p>
          <DatePicker slotProps={customIdWhenProps} />
        </div>
        <div className="flex flex-row px-1">
          <p className="font-semibold px-1">Time</p>
          <TimePicker label="" slotProps={customIdWhenProps}/>
        </div>
      </div>
    </LocalizationProvider>
  );
}