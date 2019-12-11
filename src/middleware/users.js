import * as usersAPI from '../api/users'
import actionCreator from '../actions'

const get = store => next => async action => {
  try {
    const { id } = action.payload
    const user = await usersAPI.get(id)
    next(actionCreator.users.set(user))
  } catch (error) {
    next(actionCreator.app.setError(error))
    throw error
  }
}

const users = store => next => action => {
  if (action.type === 'USERS/GET') {
    return get(store)(next)(action)
  }

  return next(action)
}

export default users
