"use client"

import { DatePicker } from 'date-picker-nextjs';
import { useState } from 'react';

export default function DatePickerComponent() {
  const [modalDateIsOpen, setModalDateIsOpen] = useState(false);
  const [clickedInput, setClickedInput] = useState(null);

  const handleDatePicker = (e: any) => {
    setClickedInput(e.target.id)
    setModalDateIsOpen(true)
  }

  const submit = (e: any) => {
    e.preventDefault()
    // your logic
  }

  return (
    <>
      <input
        style={{color: 'white', backgroundColor: 'black'}}
        className="input-field outline-none"
        type="text"
        id="when"
        name="when"
        placeholder="When"
        onClick={handleDatePicker}
      />
      {modalDateIsOpen && (
        <DatePicker
          setModalDateIsOpen={setModalDateIsOpen}
          clickedInput={clickedInput}
        />
      )}
    </>
  );
}