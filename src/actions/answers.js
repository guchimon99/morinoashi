export const create = (userID, questionID, data, image) => ({
  type: 'ANSWERS/CREATE',
  payload: { userID, questionID, data, image }
})

export const createInit = () => ({
  type: 'ANSWERS/CREATE_INIT'
})

export const createStart = () => ({
  type: 'ANSWERS/CREATE_START'
})

export const createSucceed = () => ({
  type: 'ANSWERS/CREATE_SUCCEED'
})

export const createFailed = (error) => ({
  type: 'ANSWERS/CREATE_FAILED',
  payload: { error }
})

export const get = (userID, questionID, answerID) => ({
  type: 'ANSWERS/GET',
  payload: { userID, questionID, answerID }
})

export const getByUserIDAndQuestionID = (userID, questionID) => ({
  type: 'ANSWERS/GET_BY_USER_ID_AND_QUESTION_ID',
  payload: { userID, questionID }
})

export const set = (userID, questionID, answer) => ({
  type: 'ANSWERS/SET',
  payload: { userID, questionID, answer }
})

export const setList = (userID, questionID, answers) => ({
  type: 'ANSWERS/SET_LIST',
  payload: { userID, questionID, answers }
})
