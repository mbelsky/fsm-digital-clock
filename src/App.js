import React, { useCallback, useEffect, useReducer } from 'react'
import './App.css'
import clockReducer from './Clock/clockReducer'
import { ACTIONS, STATUSES } from './Clock/consts'
import Display from './Display/Display'
import parseNow from './utils/parseNow'

function getDisplayProps({ editedNow, now, nowOffset, status }) {
  switch (status) {
    case STATUSES.IDLE:
      return parseNow(now + nowOffset)
    case STATUSES.SET_TIME:
      return { ...editedNow, isBlinking: true }
    default:
      throw new Error()
  }
}

function App() {
  const [state, dispatch] = useReducer(clockReducer, {
    now: Date.now(),
    nowOffset: 0,
    status: STATUSES.IDLE,
  })

  const handleSetClick = useCallback(
    () => dispatch({ type: ACTIONS.ON_SET }),
    [],
  )
  const handleHoursClick = useCallback(
    () => dispatch({ type: ACTIONS.ON_HOURS }),
    [],
  )
  const handleMinutesClick = useCallback(
    () => dispatch({ type: ACTIONS.ON_MINUTES }),
    [],
  )

  useEffect(() => {
    const id = window.setInterval(
      () => dispatch({ type: ACTIONS.SET_NOW }),
      1000,
    )

    return () => window.clearInterval(id)
  }, [])

  return (
    <div className='App'>
      <div className='Clock'>
        <Display {...getDisplayProps(state)} key={state.status} />
        <div className='Clock-ControlsPanel'>
          <button
            className='Clock-ControlsPanel-Button'
            onClick={handleSetClick}
          >
            Set
          </button>
          <button
            className='Clock-ControlsPanel-Button'
            onClick={handleHoursClick}
          >
            H
          </button>
          <button
            className='Clock-ControlsPanel-Button'
            onClick={handleMinutesClick}
          >
            M
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
