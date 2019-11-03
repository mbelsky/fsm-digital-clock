import React, { useState, useEffect } from 'react'
import './App.css'
import Display from './Display/Display'

function parseNow(now) {
  const date = new Date(now)
  return {
    hours: date.getHours(),
    minutes: date.getMinutes(),
  }
}

function App() {
  const [now, setNow] = useState(Date.now())

  useEffect(() => {
    function trackNow() {
      setNow(Date.now())
    }

    const id = window.setInterval(trackNow, 1000)

    return () => window.clearInterval(id)
  }, [])

  return (
    <div className='App'>
      <div className='Clock'>
        <Display {...parseNow(now)} />
        <div className='Clock-ControlsPanel'>
          <button className='Clock-ControlsPanel-Button'>Set</button>
          <button className='Clock-ControlsPanel-Button'>H</button>
          <button className='Clock-ControlsPanel-Button'>M</button>
        </div>
      </div>
    </div>
  )
}

export default App
