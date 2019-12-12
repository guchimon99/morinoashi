const initialState = {
  isProcessing: false,
  error: null
}

const profileUpdate = (state = initialState, action) => {
  switch (action.type) {
    case 'SETTINGS/PROFILE_UPDATE_INIT': {
      return initialState
    }
    case 'SETTINGS/PROFILE_UPDATE_START': {
      return {
        ...state,
        isProcessing: true
      }
    }
    case 'SETTINGS/PROFILE_UPDATE_SUCCEED': {
      return {
        ...state,
        isProcessing: false
      }
    }
    case 'SETTINGS/PROFILE_UPDATE_FAILED': {
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

export default profileUpdate
