"use client"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
var convertTime = require('convert-time');

export default function DateTimePicker({date_time} : {date_time: any}) {

  const datetime = `${date_time.date.replace(/\//g, '-')}T${convertTime(date_time.time)}`;
  const converted_datetime = datetime.substring(6, 10) + '-' + datetime.substring(0, 2) + '-' + 
                             datetime.substring(3, 4) + datetime.substring(10);

  const customIdWhenProps = {
      textField: { id: "when", name: "when" }
  };
  function setValue(newValue: any) {
    return dayjs(newValue);
  }
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-row place-content-center pb-2">
        <div className="flex flex-row px-1">
          <p className="font-semibold px-1">Date</p>
          <DatePicker slotProps={customIdWhenProps} 
            value={dayjs(date_time.date)}
            onChange={(e) => {
              setValue(e);
            }}
          />
        </div>
        <div className="flex flex-row px-1">
          <p className="font-semibold px-1">Time</p>
          <TimePicker label="" slotProps={customIdWhenProps}
            value={dayjs(converted_datetime)}
            onChange={(e) => {
              setValue(e);
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}