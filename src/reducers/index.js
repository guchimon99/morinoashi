import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import app from './app'

import users from './users'

import signIn from './signIn'
import signUp from './signUp'
import questionsCreate from './questionsCreate'
import answersCreate from './answersCreate'
import profileUpdate from './profileUpdate'

const createRootReducer = (history) => combineReducers({
  app,

  users,

  signIn,
  signUp,
  questionsCreate,
  answersCreate,
  profileUpdate,

  router: connectRouter(history)
})

export default createRootReducer
