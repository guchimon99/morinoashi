import * as authAPI from '../api/auth'
import * as usersAPI from '../api/users'

import actionCreator from '../actions'

const init = store => next => async action => {
  authAPI.onAuthStateChanged((user) => {
    next(actionCreator.app.setCurrentUser(user))
    next(actionCreator.app.initSucceed())
  })
}

const signUp = store => next => async action => {
  next(actionCreator.app.signUpStart())
  try {
    const { email, password, displayName } = action.payload

    const credential = await authAPI.signUp(email, password)

    const id = credential.user.uid
    await usersAPI.create({ id, displayName })

    next(actionCreator.app.signUpSucceed())
  } catch (error) {
    next(actionCreator.app.signUpFailed(error))
    throw error
  }
}

const signIn = store => next => async action => {
  next(actionCreator.app.signInStart())
  try {
    const { email, password } = action.payload
    await authAPI.signIn(email, password)
    next(actionCreator.app.signInSucceed())
  } catch (error) {
    next(actionCreator.app.signInFailed(error))
    throw error
  }
}

const signOut = store => next => async action => {
  next(actionCreator.app.signOutStart())
  try {
    await authAPI.signOut()
    next(actionCreator.app.signOutSucceed())
  } catch (error) {
    next(actionCreator.app.signOutFailed(error))
    throw error
  }
}

const app = store => next => action => {
  switch (action.type) {
    case 'APP/INIT':
      init(store)(next)(action)
      break
    case 'APP/SIGN_UP':
      signUp(store)(next)(action)
      break
    case 'APP/SIGN_IN':
      signIn(store)(next)(action)
      break
    case 'APP/SIGN_OUT':
      signOut(store)(next)(action)
      break
    default:
  }
  return next(action)
}

export default app
