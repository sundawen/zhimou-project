import * as types from '../constants/ActionTypes'

const analysisList1 = (state = { }, action) => {
  const { type, payload } = action
  switch (type) {
    case types.HISTORYERROE:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default analysisList1