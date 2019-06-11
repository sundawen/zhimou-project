import * as types from '../constants/ActionTypes'

const videoData2List = (state = { }, action) => {
  const { type, payload } = action
  switch (type) {
    case types.CHANNELSECOND:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}

export default videoData2List