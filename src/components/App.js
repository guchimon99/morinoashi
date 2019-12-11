import React from 'react'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { ConnectedRouter } from 'connected-react-router'
import { Switch, Route, Redirect } from 'react-router-dom'

import configureStore, { history } from '../store'

import Me from './Me'
import Welcome from './Welcome'
import SignIn from './SignIn'
import SignUp from './SignUp'
import SignOut from './SignOut'
import Users from './Users'
import NotFound from './NotFound'
import Splash from './Splash'

const store = configureStore()
const persistor = persistStore(store)

function App () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <>
            <Switch>
              <Route path="/welcome" component={Welcome} />
              <Route path="/signin" exact component={SignIn} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/signout" exact component={SignOut} />
              <Route path="/i" component={Me} />
              <Route path="/:userID" component={Users} />
              <Redirect path="/" exact to={'/welcome'} />
              <Route path="404" component={NotFound} />
            </Switch>
            <Splash />
          </>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
