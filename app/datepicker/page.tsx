"use client"
import { DatePicker } from 'date-picker-nextjs';
import { useState } from 'react';

export default function Page() {
  const [modalDateIsOpen, setModalDateIsOpen] = useState(false)
  const [clickedInput, setClickedInput] = useState(null)

  const handleDatePicker = (e: any) => {
    setClickedInput(e.target.id)
    setModalDateIsOpen(true)
  }

  const submit = (e) => {
    e.preventDefault()
    // your logic
  }

  return (
    <>
      <form className="test" onSubmit={submit}>
        <label style={{color: 'white', backgroundColor: 'black'}} htmlFor="birthdate">Birthdate</label>
        <input
          style={{color: 'white', backgroundColor: 'black'}}
          className="input-field outline-none"
          type="text"
          id="dateOfBirth"
          placeholder="Date of birth"
          onClick={handleDatePicker}
        />

        <input type="submit" value="Submit" />
      </form>
      {modalDateIsOpen && (
        <DatePicker
          setModalDateIsOpen={setModalDateIsOpen}
          clickedInput={clickedInput}
        />
      )}
    </>
  )
}