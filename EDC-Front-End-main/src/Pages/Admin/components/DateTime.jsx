import React, { useState, useEffect } from 'react'

const DateTime = () => {
  var [date, setDate] = useState(new Date())

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  return (
    <div className="flex flex-row  justify-center items-center w-full max-w-xs   p-3">
      <div className="flex flex-row  justify-center items-center w-full max-w-xs bg-gray-50 rounded-md p-2">
        <span className="date-time__hours">{date.getHours() % 12}</span>
        <span>:</span>
        <span className="date-time__minutes">{date.getMinutes()}</span>
        <span className="date-time__unit">{date.getHours() > 12 ? 'PM' : 'AM'}</span>
        <span className="date-time__date"> {date.toLocaleDateString()}</span>
      </div>
    </div>
  )
}

export default DateTime
