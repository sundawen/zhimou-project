import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, BrowserHistory, Switch } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import Loadable from 'react-loadable'
import { Provider } from 'react-intl-redux'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import store from './configureStore'
import './app.css'

addLocaleData([...en, ...zh])
const Loading = () => (<div />)
const Video = Loadable({
    loader: () => import('./components/Video/Video'),
    loading: Loading,
  })

  const Parent = () => (
    <div>
      <Route path="/" component={Video} />
    </div>
  )

ReactDOM.render(
    <AppContainer>
    <Provider store={store}>
      <HashRouter basename="" history={BrowserHistory}>
        <div>
          <Switch>
            <Route path="/video" component={Video} />
            <Route path="/" component={Parent} />
          </Switch>
        </div>
      </HashRouter>
    </Provider>
  </AppContainer>
  , document.getElementById('app')
)
