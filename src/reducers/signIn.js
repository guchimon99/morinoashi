const initialState = {
  isProcessing: false,
  error: null
}

const signIn = (state = initialState, action) => {
  switch (action.type) {
    case 'APP/SIGN_IN_INIT': {
      return initialState
    }
    case 'APP/SIGN_IN_START': {
      return {
        ...state,
        isProcessing: true
      }
    }
    case 'APP/SIGN_IN_SUCCEED': {
      return {
        ...state,
        isProcessing: false
      }
    }
    case 'APP/SIGN_IN_FAILED': {
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

export default signIn
