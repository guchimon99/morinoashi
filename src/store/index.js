import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import createRootReducer from '../reducers'

import app from '../middleware/app'
import users from '../middleware/users'
import answers from '../middleware/answers'
import questions from '../middleware/questions'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users']
}

export const history = createBrowserHistory()

const persistedReducer = persistReducer(persistConfig, createRootReducer(history))
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore (preloadedState = {}) {
  return createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        app,
        users,
        questions,
        answers,
        routerMiddleware(history)
      )
    )
  )
}
