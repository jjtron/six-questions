"use client"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
var convertTime = require('convert-time');

export default function DateTimePicker(
      {date_time, view, form_data_name} :
      {
        date_time: {date: string; time: string;},
        view: any[],
        form_data_name: string
      }
  ) {

  const datetime = `${date_time.date.replace(/\//g, '-')}T${convertTime(date_time.time)}`;
  const converted_datetime = datetime.substring(6, 10) + '-' + datetime.substring(0, 2) + '-' + 
                             datetime.substring(3, 4) + datetime.substring(10);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="flex flex-row">
        <div className="w-40">
          {
            (() => {
              if (converted_datetime !== '1900-01-0T12:00') {
                return (<DatePicker className="bg-indigo-100" slotProps={{ textField: { size: 'small', id: "when", name: form_data_name } }}
                  value={dayjs(date_time.date)}
                  views={view}
                  onChange={((e) => {})}
                />)
              } else {
                  return (<DatePicker className="bg-indigo-100" slotProps={{ textField: { size: 'small', id: "when", name: form_data_name } }}
                  views={view} />)
              }
            })()
          }
        </div>
        <div className="w-40 pl-1">
          {
            (() => {
              // if datepicker view is ["year", "month"] (length of 2), do not show time picker
              if (view.length === 3) {
                if (converted_datetime !== '1900-01-0T12:00') {
                  return (<TimePicker className="bg-indigo-100" slotProps={{ textField: { size: 'small', id: "yr_mon_day_time", name: "yr_mon_day_time" } }}
                              value={dayjs(converted_datetime)}
                              onChange={((e) => {})}
                  />)
                } else {
                    return (<TimePicker className="bg-indigo-100" slotProps={{ textField: { size: 'small', id: "yr_mon_day_time", name: "yr_mon_day_time" } }} />)
                }
              }
            })()
          }
        </div>
      </div>
    </LocalizationProvider>
  );
}