import {combineReducers} from 'redux'
import { intlReducer } from 'react-intl-redux'

import channelList from './channelList'
import videoData2List from './videoData2List'
import analysisList1 from './analysisList1'


const rootReducer = combineReducers({
  intl: intlReducer,
  channelList,
  videoData2List,
  analysisList1,
})

export default rootReducer
