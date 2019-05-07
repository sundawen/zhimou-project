import {combineReducers} from 'redux'
import { intlReducer } from 'react-intl-redux'

import channelList from './channelList'
import videoData2List from './videoData2List'


const rootReducer = combineReducers({
  intl: intlReducer,
  channelList,
  videoData2List,
})

export default rootReducer
