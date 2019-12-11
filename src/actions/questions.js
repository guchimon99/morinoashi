export const create = (userID, data, image) => ({
  type: 'QUESTIONS/CREATE',
  payload: { userID, data, image }
})

export const createInit = () => ({
  type: 'QUESTIONS/CREATE_INIT'
})

export const createStart = () => ({
  type: 'QUESTIONS/CREATE_START'
})

export const createSucceed = () => ({
  type: 'QUESTIONS/CREATE_SUCCEED'
})

export const createFailed = (error) => ({
  type: 'QUESTIONS/CREATE_FAILED',
  payload: { error }
})

export const update = (userID, question) => ({
  type: 'QUESTIONS/UPDATE',
  payload: { userID, question }
})

export const get = (userID, questionID) => ({
  type: 'QUESTIONS/GET',
  payload: { userID, questionID }
})

export const getByUserID = (userID) => ({
  type: 'QUESTIONS/GET_BY_USER_ID',
  payload: { userID }
})

export const set = (userID, question) => ({
  type: 'QUESTIONS/SET',
  payload: { userID, question }
})

export const setList = (userID, questions) => ({
  type: 'QUESTIONS/SET_LIST',
  payload: { userID, questions }
})
