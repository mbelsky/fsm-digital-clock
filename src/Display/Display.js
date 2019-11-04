import React from 'react'
import './Display.css'

function formatValue(value) {
  return String(value).padStart(2, '0')
}

function Display({ isBlinking, hours, minutes }) {
  const classname = isBlinking ? 'Display-blinking' : undefined
  return (
    <div className='Display-time'>
      <span className={classname}>{formatValue(hours)}</span>
      <span className='Display-blinking'>:</span>
      <span className={classname}>{formatValue(minutes)}</span>
    </div>
  )
}

export default React.memo(Display)
