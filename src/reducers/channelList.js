import * as types from '../constants/ActionTypes'

const channelList = (state = { }, action) => {
  const { type, payload } = action
  switch (type) {
    case types.CHANNEL:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default channelList