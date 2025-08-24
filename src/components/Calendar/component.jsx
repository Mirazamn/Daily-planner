import { useState } from 'react'
import './style.css'

function Calendar() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const GetWeekDays = (date) => {
      const today = new Date(date)
      let dayOfWeek = today.getDay()

      if (dayOfWeek === 0) {
        dayOfWeek = 7
      }

      const monday = new Date(today)
      monday.setDate(today.getDate() - (dayOfWeek - 1))

      let week = []
      for (let i = 0; i < 7; i++) {
        let d = new Date(monday)
        d.setDate(monday.getDate() + i)
        week.push(d)
      }

      return week
    }
  
    const [today, setToday] = useState(new Date())
    const week = GetWeekDays(today)

    // Swipe settings
    let startX = 0
    let endX = 0
    
    // Touch 
    const handleTouchStart = (e) => {
      startX = e.changedTouches[0].screenX
    }
    const handleTouchEnd = (e) => {
      endX = e.changedTouches[0].screenX
      handleSwipe()
    }
    
    // Mouse 
    const handleMouseDown = (e) => {
      startX = e.clientX
    }
    const handleMouseUp = (e) => {
      endX = e.clientX
      handleSwipe()
    }
    
    const handleSwipe = () => {
      if (startX - endX > 50) {
        setToday(new Date(today.setDate(today.getDate() + 7)))
      }
      if (endX - startX > 50) {
        setToday(new Date(today.setDate(today.getDate() - 7)))
      }
    }
  
  return (
    <div 
        className="calendar flex cards"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}>

      {week.map((date) => {
          const realToday = new Date()
          const isToday = date.toDateString() === realToday.toDateString() && date.getMonth() === today.getMonth()
          const isNewMonth = date.getDate() === 1

          return (
            <div key={date.toDateString()} className={'day flex ' + (isToday ? 'today': isNewMonth ? 'month' : '')}>
              <h6>{date.toLocaleDateString("en-US", {weekday: "short"})}</h6>
              <h3>{date.getDate()}</h3>
            </div>
          )
        })}

    </div>
  )
}

export default Calendar