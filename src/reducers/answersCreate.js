const initialState = {
  isProcessing: false,
  error: null
}

const questionsCreate = (state = initialState, action) => {
  switch (action.type) {
    case 'ANSWERS/CREATE_INIT': {
      return initialState
    }
    case 'ANSWERS/CREATE_START': {
      return {
        ...state,
        isProcessing: true
      }
    }
    case 'ANSWERS/CREATE_SUCCEED': {
      return {
        ...state,
        isProcessing: false
      }
    }
    case 'ANSWERS/CREATE_FAILED': {
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

export default questionsCreate
