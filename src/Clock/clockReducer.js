import get from 'lodash/get'
import fsm from './fsm'

export default function clockReducer(state, action) {
  let actionNames = get(fsm, ['states', state.status, 'on', action.type])

  if (!Array.isArray(actionNames)) {
    actionNames = [actionNames]
  }

  return actionNames.reduce((state, actionName) => {
    const fnAction = fsm.actions[actionName]

    if (fnAction) {
      return fnAction.call(null, state, action)
    }

    return state
  }, state)
}
