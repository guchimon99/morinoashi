import * as answersAPI from '../api/answers'
import * as storageAPI from '../api/storage'

import actionCreator from '../actions'

const create = store => next => async action => {
  next(actionCreator.answers.createStart())
  try {
    const { userID, questionID, data, image } = action.payload
    const answer = await answersAPI.create(userID, questionID, data)

    await storageAPI.uploadAnswerImage(userID, questionID, answer.id, image)
    next(actionCreator.answers.set(userID, questionID, answer))
    next(actionCreator.router.push(`/${userID}/questions/${questionID}/answers/new/done`))
    next(actionCreator.answers.createSucceed())
  } catch (error) {
    next(actionCreator.answers.createFailed(error))
    throw error
  }
}

const getByUserIDAndQuestionID = store => next => async action => {
  try {
    const { userID, questionID } = action.payload
    const answers = await answersAPI.getByUserIDAndQuestionID(userID, questionID)
    next(actionCreator.answers.setList(userID, questionID, answers))
  } catch (error) {
    next(actionCreator.app.setError(error))
    throw error
  }
}

const get = store => next => async action => {
  try {
    const { userID, questionID, answerID } = action.payload
    const answer = await answersAPI.get(userID, questionID, answerID)
    next(actionCreator.answers.set(userID, questionID, answer))
  } catch (error) {
    next(actionCreator.app.setError(error))
    throw error
  }
}

const answers = store => next => action => {
  switch (action.type) {
    case 'ANSWERS/CREATE': return create(store)(next)(action)
    case 'ANSWERS/GET': return get(store)(next)(action)
    case 'ANSWERS/GET_BY_USER_ID_AND_QUESTION_ID': return getByUserIDAndQuestionID(store)(next)(action)
    default:return next(action)
  }
}

export default answers
