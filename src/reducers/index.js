import {combineReducers} from 'redux'
import { intlReducer } from 'react-intl-redux'

import channelList from './channelList'


const rootReducer = combineReducers({
  intl: intlReducer,
  channelList,
})

export default rootReducer
