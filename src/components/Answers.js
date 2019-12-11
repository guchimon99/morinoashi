import React from 'react'
import { connect } from 'react-redux'
import { Switch, Route } from 'react-router-dom'

import actionCreator from '../actions'

import AnswersCreate from './AnswersCreate'
import AnswersCreateDone from './AnswersCreateDone'
import AnswersDetail from './AnswersDetail'

function Component ({ userID, questionID, answerID, user, question, get }) {
  const [isGot, setIsGot] = React.useState(false)
  const isShouldGet = React.useMemo(() => !isGot && user && question && answerID, [isGot, user, question, answerID])

  React.useEffect(() => {
    if (!isShouldGet) return
    get(userID, questionID, answerID)
    setIsGot(true)
  }, [get, isShouldGet, userID, questionID, answerID])

  return (
    <Switch>
      <Route exact path="/:userID/questions/:questionID/answers/new" component={AnswersCreate} />
      <Route exact path="/:userID/questions/:questionID/answers/new/done" component={AnswersCreateDone} />
      <Route path="/:userID/questions/:questionID/answers/:answerID" component={AnswersDetail} />
    </Switch>
  )
}

const mapStateToProps = (state, ownProps) => {
  const { userID, questionID, answerID } = ownProps.match.params

  const user = state.users[userID] || null
  const question = user && user.questions ? user.questions[questionID] : null
  const answer = question && question.answers ? question.answers[answerID] : null

  return { userID, questionID, answerID, user, question, answer }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  get: (userID, questionID, answerID) => dispatch(actionCreator.answers.get(userID, questionID, answerID))
})

export default connect(mapStateToProps, mapDispatchToProps)(Component)
