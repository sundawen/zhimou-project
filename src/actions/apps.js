import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'
import {
  API_CHANNEL
} from '../constants/API'

export const getChannelList = () => {
    return async (dispatch) => {
      // try {
      //   const result = await RestUtil.get(API_CHANNEL)
      //   if (result.status === 200) {
      //     dispatch({ type: types.CHANNEL, payload: result.data })
      //   } else {
      //     throw result.data.errMsg
      //   }
      // } catch (e) {
      //   console.error(e)
      // }
    }
  }