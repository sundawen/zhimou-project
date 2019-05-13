import * as types from '../constants/ActionTypes'
import RestUtil from '../utils/RestUtil'
import {
  API_CHANNEL,
  API_CHANNELSECOND,
  API_STREAM_CHANNELONE,
  API_STREAM_CHANNELTWO,
  // API_HISTORY_ERROR_FIRST,
} from '../constants/API'

export const getChannelList = () => {
  const source = new EventSource(API_STREAM_CHANNELONE);
  source.addEventListener('open', () => {
    console.log('Connected');
  }, false);

  source.addEventListener('error', e => {
    if (e.target.readyState === EventSource.CLOSED) {
      console.log('Disconnected');
    } else if (e.target.readyState === EventSource.CONNECTING) {
      console.log('Connecting...');
    }
  }, false);

  return async (dispatch) => {
    try {
      source.addEventListener('greeting', e => {
        let data = JSON.parse(e.data);
        console.log(`data: ${data.message}`);
        dispatch({
          type: types.CHANNEL,
          payload: data.message
        })
      }, false);
      await RestUtil.get(API_CHANNELSECOND)
    } catch (e) {
      console.error(e)
    }
  }
}

export const getVideo2Data = () => {
  const source = new EventSource(API_STREAM_CHANNELTWO);
  source.addEventListener('open', () => {
    console.log('Connected');
  }, false);

  source.addEventListener('error', e => {
    if (e.target.readyState === EventSource.CLOSED) {
      console.log('Disconnected');
    } else if (e.target.readyState === EventSource.CONNECTING) {
      console.log('Connecting...');
    }
  }, false);

  return async (dispatch) => {
    try {
      source.addEventListener('greeting', e => {
        let data = JSON.parse(e.data);
        console.log(`data: ${data.message}`);
        dispatch({
          type: types.CHANNELSECOND,
          payload: data.message
        })
      }, false);
      await RestUtil.get(API_CHANNEL)
    } catch (e) {
      console.error(e)
    }
  }
}

// export const getAnalysis1 = (camId, StartTime, EndTime, ErrorType) => {
//   return async (dispatch) => {
//     try {
//       const result = await RestUtil.get(API_HISTORY_ERROR_FIRST + `?camId=${camId}&StartTime=${StartTime}&EndTime=${EndTime}&ErrorType=${ErrorType}`)
//       if (result.status === 200) {
//         dispatch({ type: types.HISTORYERROE, payload: result.data })
//       }
//     } catch (e) {
//       console.error(e)
//     }
//   }
// }
