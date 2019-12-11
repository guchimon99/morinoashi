const initialState = {}

function getUser (userID, users = {}) {
  return users[userID] || { id: userID }
}

function getQuestion (questionID, questions = {}) {
  return questions[questionID] || { id: questionID }
}

function getAnswer (answerID, answers = {}) {
  return answers[answerID] || { id: answerID }
}

function setUser (user, users = {}) {
  return {
    ...users,
    [user.id]: user
  }
}

function setQuestion (question, questions = {}) {
  return {
    ...questions,
    [question.id]: question
  }
}

function setAnswer (answer, answers = {}) {
  return {
    ...answers,
    [answer.id]: answer
  }
}

function combineUserToUser (user, baseUser = {}) {
  return {
    ...baseUser,
    ...user,
    questions: combineQuestionsToQuestions(user.questions, baseUser.questions)
  }
}

function combineQuestionToQuestion (question, baseQuestion = {}) {
  return {
    ...baseQuestion,
    ...question,
    answers: combineAnswersToAnswers(question.answers, baseQuestion.answers)
  }
}

function combineAnswerToAnswer (answer, baseAnswer = {}) {
  return {
    ...baseAnswer,
    ...answer
  }
}

function combineQuestionToUser (question, baseUser = {}) {
  const baseQuestion = getQuestion(question.id, baseUser.questions)
  const newQuestion = combineQuestionToQuestion(question, baseQuestion)

  const newQuestions = {
    ...baseUser.questions,
    [newQuestion.id]: newQuestion
  }

  return {
    ...baseUser,
    questions: newQuestions
  }
}

function combineAnswerToQuestion (answer, baseQuestion = {}) {
  const baseAnswer = getAnswer(answer.id, baseQuestion.answers)
  const newAnswer = combineAnswerToAnswer(answer, baseAnswer)
  const newAnswers = setAnswer(newAnswer, baseQuestion.answers)

  return {
    ...baseQuestion,
    answers: newAnswers
  }
}

function combineQuestionsToQuestions (questions = {}, baseQuestinos = {}) {
  var newQuestions = { ...baseQuestinos }

  Object.values(questions).forEach(question => {
    const baseQuestion = getQuestion(question.id, baseQuestinos)
    const newQuestion = combineQuestionToQuestion(question, baseQuestion)
    newQuestions = setQuestion(newQuestion, newQuestions)
  })

  return newQuestions
}

function combineQuestionsToUser (questions = {}, user = {}) {
  return {
    ...user,
    questions: combineQuestionsToQuestions(questions, user.questions)
  }
}

function combineAnswersToQuestion (answers = {}, question = {}) {
  return {
    ...question,
    answers: combineAnswersToAnswers(answers, question.answers)
  }
}

function combineAnswersToAnswers (answers = {}, baseAnswers = {}) {
  var newAnswers = { ...baseAnswers }

  Object.values(answers).forEach(answer => {
    const baseAnswer = getAnswer(answer.id, newAnswers)
    const newAnswer = combineAnswerToAnswer(answer, baseAnswer)
    newAnswers = setAnswer(newAnswer, newAnswers)
  })

  return newAnswers
}

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'APP/SIGN_OUT': {
      return initialState
    }
    case 'SETTINGS/PROFILE_UPDATE_SUCCEED':
    case 'USERS/SET': {
      const { user } = action.payload
      const baseUser = getUser(user.id, state)
      const newUser = combineUserToUser(user, baseUser)
      return setUser(newUser, state)
    }
    case 'USERS/SET_LIST': {
      const { users } = action.payload

      users.forEach(user => {
        const baseUser = getUser(user.id, state)
        const newUser = combineUserToUser(user, baseUser)
        state = setUser(newUser, state)
      })

      return state
    }
    case 'QUESTIONS/SET': {
      const { userID, question } = action.payload
      const baseUser = getUser(userID, state)
      const newUser = combineQuestionToUser(question, baseUser)
      return setUser(newUser, state)
    }
    case 'QUESTIONS/SET_LIST': {
      const { userID, questions } = action.payload
      const baseUser = getUser(userID, state)
      const newUser = combineQuestionsToUser(questions, baseUser)
      state = setUser(newUser, state)

      return state
    }
    case 'ANSWERS/SET' : {
      const { userID, questionID, answer } = action.payload
      const baseUser = getUser(userID, state)
      const baseQuestion = getQuestion(questionID, baseUser.questions)
      const newQuestion = combineAnswerToQuestion(answer, baseQuestion)
      const newUser = combineQuestionToUser(newQuestion, baseUser)
      state = setUser(newUser, state)
      return state
    }
    case 'ANSWERS/SET_LIST' : {
      const { userID, questionID, answers } = action.payload

      const baseUser = getUser(userID, state)
      const baseQuestion = getQuestion(questionID, baseUser.questions)
      const newQuestion = combineAnswersToQuestion(answers, baseQuestion)
      const newUser = combineQuestionToUser(newQuestion, baseUser)
      state = setUser(newUser, state)

      return state
    }
    default: return state
  }
}

export default users
