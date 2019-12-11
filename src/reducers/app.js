const initialState = {
  currentUser: null,
  isReady: false,
  error: null
}

const app = (state = initialState, action) => {
  switch (action.type) {
    case 'APP/INIT_SUCCEED': {
      return {
        ...state,
        isReady: true
      }
    }
    case 'APP/SET_CURRENT_USER': {
      const { currentUser } = action.payload
      return {
        ...state,
        currentUser
      }
    }
    case 'APP/SIGN_OUT_SUCCEED': {
      const currentUser = null
      return {
        ...state,
        currentUser
      }
    }
    case 'APP/SET_ERROR': {
      const { error } = action.payload
      return {
        ...state,
        error
      }
    }
    default:
      return state
  }
}

export default app
