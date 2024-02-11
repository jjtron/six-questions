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
      <DatePicker slotProps={customIdWhenProps} />
      <TimePicker label="Basic time picker" slotProps={customIdWhenProps}/>
      
    </LocalizationProvider>
  );
}