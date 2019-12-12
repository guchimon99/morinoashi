export const profileUpdate = (userID, data) => ({
  type: 'SETTINGS/PROFILE_UPDATE',
  payload: { userID, data }
})

export const profileUpdateInit = () => ({
  type: 'SETTINGS/PROFILE_UPDATE_INIT'
})

export const profileUpdateStart = () => ({
  type: 'SETTINGS/PROFILE_UPDATE_START'
})

export const profileUpdateSucceed = (user) => ({
  type: 'SETTINGS/PROFILE_UPDATE_SUCCEED',
  payload: { user }
})

export const profileUpdateFailed = (error) => ({
  type: 'SETTINGS/PROFILE_UPDATE_FAILED',
  payload: { error }
})
