"use client"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
var convertTime = require('convert-time');

export default function DateTimePicker({date_time} : {date_time: {date: string; time: string;}}) {

  const datetime = `${date_time.date.replace(/\//g, '-')}T${convertTime(date_time.time)}`;
  const converted_datetime = datetime.substring(6, 10) + '-' + datetime.substring(0, 2) + '-' + 
                             datetime.substring(3, 4) + datetime.substring(10);

  const customIdWhenProps = {
      textField: { id: "when", name: "when" }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-row place-content-center pb-2">
        <div className="flex flex-row px-1">
          {
            (() => {
              if (converted_datetime !== '1900-01-0T12:00') {
                return (<DatePicker label="Date" slotProps={customIdWhenProps} 
                  value={dayjs(date_time.date)}
                  onChange={((e) => {})}
                />)
              } else {
                  return (<DatePicker label="Date" slotProps={customIdWhenProps} />)
              }
            })()
          }
        </div>
        <div className="flex flex-row px-1">
          {
            (() => {
              if (converted_datetime !== '1900-01-0T12:00') {
                return (<TimePicker label="Time" slotProps={customIdWhenProps}
                            value={dayjs(converted_datetime)}
                            onChange={((e) => {})}
                />)
              } else {
                  return (<TimePicker label="Time" slotProps={customIdWhenProps} />)
              }
            })()
          }
        </div>
      </div>
    </LocalizationProvider>
  );
}