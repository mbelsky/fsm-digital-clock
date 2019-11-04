import parseNow from '../utils/parseNow'
import { ACTIONS, STATUSES } from './consts'

function setEditedNow(state, action) {
  const { editedNow } = state
  let { hours, minutes } = editedNow

  switch (action.type) {
    case ACTIONS.ON_HOURS:
      minutes += 60
      break
    case ACTIONS.ON_MINUTES:
      minutes += 1
      break
    default:
      throw new Error(`Unexpected action ${action.type}`)
  }

  if (minutes > 59) {
    hours += 1
    minutes = minutes % 60
  }

  return { ...state, editedNow: { hours, minutes } }
}

function fixNowOffset(state) {
  const nowOffset = (() => {
    const now = parseNow(Date.now())
    const { hours, minutes } = state.editedNow

    const nowInMinutes = now.hours * 60 + now.minutes
    const editedNowInMinutes = hours * 60 + minutes

    return (editedNowInMinutes - nowInMinutes) * 60 * 1000
  })()

  return {
    ...state,
    editedNow: undefined,
    nowOffset,
  }
}

export default {
  states: {
    [STATUSES.ALARM]: {},
    [STATUSES.IDLE]: {
      on: {
        [ACTIONS.ON_SET]: 'enableSetTime',
        [ACTIONS.SET_NOW]: 'setNow',
      },
    },
    [STATUSES.SET_ALARM]: {},
    [STATUSES.SET_TIME]: {
      on: {
        [ACTIONS.ON_HOURS]: 'setEditedNow',
        [ACTIONS.ON_MINUTES]: 'setEditedNow',
        [ACTIONS.ON_SET]: ['fixNowOffset', 'setNow', 'enableIdle'],
      },
    },
  },
  actions: {
    enableIdle: (state) => ({
      ...state,
      status: STATUSES.IDLE,
    }),
    enableSetTime: (state) => ({
      ...state,
      editedNow: parseNow(state.now + state.nowOffset),
      status: STATUSES.SET_TIME,
    }),
    fixNowOffset,
    setNow: (state) => ({
      ...state,
      now: Date.now(),
    }),
    setEditedNow,
  },
}
