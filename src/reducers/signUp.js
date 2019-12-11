const initialState = {
  isProcessing: false,
  error: null
}

const signUp = (state = initialState, action) => {
  switch (action.type) {
    case 'APP/SIGN_UP_INIT': {
      return initialState
    }
    case 'APP/SIGN_UP_START': {
      return {
        ...state,
        isProcessing: true
      }
    }
    case 'APP/SIGN_UP_SUCCEED': {
      return {
        ...state,
        isProcessing: false
      }
    }
    case 'APP/SIGN_UP_FAILED': {
      const { error } = action.payload
      return {
        ...state,
        isProcessing: false,
        error
      }
    }
    default: return state
  }
}

export default signUp
