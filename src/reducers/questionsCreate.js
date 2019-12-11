const initialState = {
  isProcessing: false,
  error: null
}

const questionsCreate = (state = initialState, action) => {
  switch (action.type) {
    case 'QUESTIONS/CREATE_INIT': {
      return initialState
    }
    case 'QUESTIONS/CREATE_START': {
      return {
        ...state,
        isProcessing: true
      }
    }
    case 'QUESTIONS/CREATE_SUCCEED': {
      return {
        ...state,
        isProcessing: false
      }
    }
    case 'QUESTIONS/CREATE_FAILED': {
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
