export const signUp = (email, password, displayName) => ({
  type: 'APP/SIGN_UP',
  payload: { email, password, displayName }
})

export const signUpInit = () => ({
  type: 'APP/SIGN_UP_INIT'
})

export const signUpStart = () => ({
  type: 'APP/SIGN_UP_START'
})

export const signUpSucceed = (currentUser, user) => ({
  type: 'APP/SIGN_UP_SUCCEED',
  payload: { currentUser, user }
})

export const signUpFailed = (error) => ({
  type: 'APP/SIGN_UP_FAILED',
  payload: { error }
})

export const signIn = (email, password) => ({
  type: 'APP/SIGN_IN',
  payload: { email, password }
})

export const signInInit = () => ({
  type: 'APP/SIGN_IN_INIT'
})

export const signInStart = () => ({
  type: 'APP/SIGN_IN_START'
})

export const signInSucceed = (currentUser, user) => ({
  type: 'APP/SIGN_IN_SUCCEED',
  payload: { currentUser, user }
})

export const signInFailed = (error) => ({
  type: 'APP/SIGN_IN_FAILED',
  payload: { error }
})

export const setCurrentUser = (currentUser) => ({
  type: 'APP/SET_CURRENT_USER',
  payload: { currentUser }
})

export const init = () => ({
  type: 'APP/INIT'
})

export const initSucceed = () => ({
  type: 'APP/INIT_SUCCEED'
})

export const signOut = () => ({
  type: 'APP/SIGN_OUT'
})

export const signOutStart = () => ({
  type: 'APP/SIGN_OUT_START'
})

export const signOutSucceed = () => ({
  type: 'APP/SIGN_OUT_SUCCEED'
})

export const signOutFailed = () => ({
  type: 'APP/SIGN_OUT_FAILED'
})

export const setError = (error) => ({
  type: 'APP/SET_ERROR',
  payload: { error }
})
