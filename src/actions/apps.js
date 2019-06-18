import * as types from '../constants/ActionTypes'
import { API_STREAM_CHANNELONE } from '../constants/API'

// 定时器，主要用于 SSE
const timer = {}

// 清除定时器
const clearTimer = () => {
  for (let i in timer) {
    clearTimeout(timer[i]);
  }
}

const getChannelList = () => {
  const source = new EventSource(API_STREAM_CHANNELONE);
  console.log(source);
  const hp = source.url.substring(0, source.url.indexOf('stream'))
  source.addEventListener('open', () => {
    console.log('Connected');
  }, false);

  source.addEventListener('error', e => {
    if (e.target.readyState === EventSource.CLOSED) {
      console.log('Disconnected');
      // 断连1秒钟后再次发起请求
      timer['sse'] = setTimeout(getChannelList, 1000);
    } else if (e.target.readyState === EventSource.CONNECTING) {
      console.log('Connecting...');
    }
  }, false);

  return async (dispatch) => {
    try {
      source.addEventListener('greeting', e => {
        let data = JSON.parse(e.data);
        data.message.img = hp.concat(data.message.img);
        console.log(`data: ${data.message}`);
        dispatch({
          type: types.CHANNEL,
          payload: data.message
        })
      }, false);
    } catch (e) {
      console.error(e)
    }
  }
}

export { clearTimer, getChannelList }