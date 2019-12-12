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

const profileUpdate = store => next => async action => {
  next(actionCreator.settings.profileUpdateStart())
  try {
    const { userID, data } = action.payload
    const user = await usersAPI.update(userID, data)
    next(actionCreator.settings.profileUpdateSucceed(user))
  } catch (error) {
    next(actionCreator.settings.profileUpdateFailed(error))
    throw error
  }
}

const users = store => next => action => {
  if (action.type === 'USERS/GET') {
    return get(store)(next)(action)
  } else if (action.type === 'SETTINGS/PROFILE_UPDATE') {
    return profileUpdate(store)(next)(action)
  }

  return next(action)
}

export default users
