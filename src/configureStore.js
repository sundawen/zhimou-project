import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import en_US from './i18n/en_US'


const middlewares = []
middlewares.push(thunk)
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}
const finalCreateStore = compose(applyMiddleware(...middlewares))(createStore)

function configureStore(initialState) {
  const store = finalCreateStore(rootReducer, initialState)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

const initialState = {
  intl: {
    locale: 'en',
    messages: en_US,
  },
}

export default configureStore(initialState)
