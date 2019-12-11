import * as questionsAPI from '../api/questions'
import * as storageAPI from '../api/storage'

import actionCreator from '../actions'

const create = store => next => async action => {
  next(actionCreator.questions.createStart())
  try {
    const { userID, data, image } = action.payload
    const question = await questionsAPI.create(userID, data)

    await storageAPI.uploadQuestionImage(userID, question.id, image)

    next(actionCreator.questions.set(userID, question))
    next(actionCreator.router.push(`/${userID}/questions/${question.id}`))
    next(actionCreator.questions.createSucceed())
  } catch (error) {
    next(actionCreator.questions.createFailed(error))
    throw error
  }
}

const get = store => next => async action => {
  try {
    const { userID, questionID } = action.payload
    const question = await questionsAPI.get(userID, questionID)
    next(actionCreator.questions.set(userID, question))
  } catch (error) {
    next(actionCreator.app.setError(error))
    throw error
  }
}

const getByUserID = store => next => async action => {
  try {
    const { userID } = action.payload
    const questions = await questionsAPI.getByUserID(userID)
    next(actionCreator.questions.setList(userID, questions))
  } catch (error) {
    next(actionCreator.app.setError(error))
    throw error
  }
}

const questions = store => next => action => {
  switch (action.type) {
    case 'QUESTIONS/CREATE': return create(store)(next)(action)
    case 'QUESTIONS/GET': return get(store)(next)(action)
    case 'QUESTIONS/GET_BY_USER_ID': return getByUserID(store)(next)(action)
    default:return next(action)
  }
}

export default questions
