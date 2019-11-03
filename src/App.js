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
      <Display {...parseNow(now)} />
    </div>
  )
}

export default App
