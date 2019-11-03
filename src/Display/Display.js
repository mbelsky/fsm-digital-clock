import React from 'react'
import './Display.css'

function formatValue(value) {
  return String(value).padStart(2, '0')
}

function Display({ hours, minutes }) {
  return (
    <div className='Display-time'>
      <span>{formatValue(hours)}</span>
      <span className='Display-timeSeparator'>:</span>
      <span>{formatValue(minutes)}</span>
    </div>
  )
}

export default React.memo(Display)
